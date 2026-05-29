"""
detect.py — DeepShield Sentinel AI
────────────────────────────────────────────────────────────────────────────────
Primary detection endpoint: POST /api/v1/detect

This is the main production endpoint that the frontend calls.
It is kept separate from the existing /scan/* routes (which remain untouched)
so the ML pipeline can be iterated independently.
"""

import logging

from fastapi import APIRouter, File, HTTPException, Request, UploadFile, Depends
from fastapi.responses import JSONResponse
import os
import uuid
import tempfile
import aiofiles
from security_utils import limiter, get_api_key, validate_audio_magic_bytes

from ml.models import prediction_engine
from utils.audio_utils import preprocess_for_inference

logger = logging.getLogger(__name__)

# Limiter is imported from security_utils

# ─── Router ───────────────────────────────────────────────────────────────────
router = APIRouter(prefix="/api/v1", tags=["Detection — ML Pipeline"])

# ─── Validation constants ──────────────────────────────────────────────────────
ALLOWED_EXTENSIONS: frozenset[str] = frozenset({".wav", ".mp3", ".webm", ".m4a", ".ogg"})
MAX_FILE_SIZE_BYTES: int = 10 * 1024 * 1024   # 10 MB


@router.post(
    "/detect",
    summary="Deepfake Voice Detection",
    description=(
        "Accepts a `.wav`, `.mp3`, `.webm`, `.m4a`, or `.ogg` audio file (≤ 10 MB) "
        "and returns a structured forensic analysis result produced by the hybrid "
        "CNN + Wav2Vec2 ensemble."
    ),
    response_description="Forensic analysis result",
)
@limiter.limit("5/minute")   # max 5 requests per minute per IP
async def detect_deepfake(
    request: Request,                          # Required by slowapi
    file: UploadFile = File(description="Audio file (.wav, .mp3, .webm, .m4a, .ogg)"),
    api_key: str = Depends(get_api_key),
) -> JSONResponse:
    """
    Main deepfake detection endpoint.

    Validation flow
    ───────────────
    1. Extension check   → 400 if not .wav / .mp3 / .webm / .m4a / .ogg
    2. Size check        → 413 if > 10 MB
    3. Preprocessing     → load, resample, pad/truncate, build Mel + Wav2Vec2 tensors
    4. Inference         → CNN branch + Wav2Vec2 branch → ensemble
    5. Return result JSON

    Rate limit: 10 requests / minute per IP address.
    """

    # ── 1. File extension validation ──────────────────────────────────────────
    filename: str = file.filename or "unknown"
    ext: str = "." + filename.rsplit(".", 1)[-1].lower() if "." in filename else ""

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Unsupported file type '{ext}'. "
                f"Only {sorted(ALLOWED_EXTENSIONS)} are accepted."
            ),
        )

    # ── 2. File size validation ───────────────────────────────────────────────
    file_bytes: bytes = await file.read()

    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=413,
            detail=(
                f"File too large: {len(file_bytes) / 1_048_576:.1f} MB. "
                f"Maximum allowed size is {MAX_FILE_SIZE_BYTES // 1_048_576} MB."
            ),
        )

    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    # Validate Magic Bytes to prevent payload smuggling
    validate_audio_magic_bytes(file_bytes)

    logger.info(
        "Received audio file: name=%s  size=%.1f KB  type=%s",
        filename, len(file_bytes) / 1024, file.content_type,
    )
    
    # ── 3. Air-Gap Sanitization via Temp File ──────────────────────────────────
    temp_dir = tempfile.gettempdir()
    temp_filename = f"{uuid.uuid4()}{ext}"
    temp_path = os.path.join(temp_dir, temp_filename)
    
    try:
        # Save to disk for pydub to process
        async with aiofiles.open(temp_path, 'wb') as out_file:
            await out_file.write(file_bytes)

        # ── 4. Preprocessing ──────────────────────────────────────────────────────
        try:
            audio_array = preprocess_for_inference(
                file_path=temp_path,
                filename=filename,
            )
        except ValueError as exc:
            logger.warning("Preprocessing failed for '%s': %s", filename, exc)
            raise HTTPException(status_code=422, detail=str(exc)) from exc
        except Exception as exc:
            logger.exception("Unexpected preprocessing error for '%s'", filename)
            raise HTTPException(status_code=500, detail="Audio preprocessing failed.") from exc

        # ── 5. Inference ──────────────────────────────────────────────────────────
        try:
            result = prediction_engine.predict(audio_array)
        except Exception as exc:
            logger.exception("Inference error for '%s'", filename)
            raise HTTPException(status_code=500, detail="Model inference failed.") from exc

    finally:
        # Zero-Trust Cleanup: Guarantee temp file is deleted even if inference crashes
        if os.path.exists(temp_path):
            try:
                os.remove(temp_path)
                logger.debug("Deleted temp file: %s", temp_path)
            except Exception as cleanup_exc:
                logger.error("Failed to delete temp file %s: %s", temp_path, cleanup_exc)

    # ── 6. Return response ────────────────────────────────────────────────────
    logger.info(
        "Inference complete: label=%s  confidence=%.4f  risk=%s",
        result["label"], result["confidence"], result["risk"],
    )

    return JSONResponse(content={
        "status": "success",
        "filename": filename,
        **result,
    })
