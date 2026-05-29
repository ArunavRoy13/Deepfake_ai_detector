import os
import uuid
import tempfile
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
import imageio_ffmpeg
import subprocess

from app.utils.security_utils import limiter, verify_api_key, validate_mime_type, add_security_headers
from app.ml.models import prediction_engine
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="DeepShield Sentinel AI", version="2.0")

# Security Middleware
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.middleware("http")(add_security_headers)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    prediction_engine.load()

MAX_FILE_SIZE = 10 * 1024 * 1024 # 10 MB

@app.post("/api/v1/detect")
@limiter.limit("5/minute")
async def detect_deepfake(
    request: Request,
    file: UploadFile = File(...),
    api_key: str = Depends(verify_api_key)
):
    logger.info(f"========== NEW ANALYSIS REQUEST ==========")
    logger.info(f"Receiving file: {file.filename} (Content-Type: {file.content_type})")
    
    # 1. Resource Exhaustion Limit
    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="Payload Too Large. Max size is 10MB.")
    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="Empty file payload.")

    # 2. MIME Spoofing Defense
    validate_mime_type(file_bytes)

    # 3. Air-Gap Sanitization
    temp_id = str(uuid.uuid4())
    raw_path = os.path.join(tempfile.gettempdir(), f"raw_{temp_id}.tmp")
    clean_path = os.path.join(tempfile.gettempdir(), f"clean_{temp_id}.wav")

    try:
        # Save raw bytes securely
        with open(raw_path, "wb") as f:
            f.write(file_bytes)

        # Convert WebM to 16kHz Mono WAV natively using the embedded FFmpeg binary
        ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
        subprocess.run([
            ffmpeg_exe, "-y", "-i", raw_path, 
            "-ac", "1", "-ar", "16000", clean_path
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        # 4. ML Engine Prediction
        result = prediction_engine.predict(clean_path, file.filename)
        result["status"] = "success"
        result["filename"] = file.filename
        return result

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        # 5. Zero-Trust Cleanup
        if os.path.exists(raw_path):
            try: os.remove(raw_path)
            except: pass
        if clean_path != raw_path and os.path.exists(clean_path):
            try: os.remove(clean_path)
            except: pass
