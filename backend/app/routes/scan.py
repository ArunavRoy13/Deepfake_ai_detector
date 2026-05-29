import os
import uuid

from fastapi import APIRouter, UploadFile, File, HTTPException

from utils.validation import (
    validate_file_extension,
    validate_file_size
)

from utils.file_handler import (
    save_upload_file,
    generate_file_name
)

from utils.audio_preprocessing import preprocess_audio
from utils.feature_extraction import extract_features
from utils.inference import predict_audio

router = APIRouter()

UPLOAD_FOLDER = "uploads"


@router.post("/upload")
async def upload_audio(file: UploadFile = File(...)):

    # Validate extension
    if not validate_file_extension(file.filename):
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type"
        )

    # Read content
    content = await file.read()

    # Validate size
    if not validate_file_size(len(content)):
        raise HTTPException(
            status_code=400,
            detail="File too large"
        )

    # Reset pointer
    await file.seek(0)

    # Generate secure filename
    secure_name = generate_file_name(file.filename)

    save_path = os.path.join(
        UPLOAD_FOLDER,
        secure_name
    )

    # Save file
    await save_upload_file(file, save_path)

    # REAL AI PREDICTION
    result = predict_audio(save_path)

    return {
        "upload_id": str(uuid.uuid4()),
        "filename": secure_name,
        **result
    }

@router.post("/record")
async def analyze_recording(file: UploadFile = File(...)):

    # Validate extension
    if not validate_file_extension(file.filename):
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type"
        )

    content = await file.read()

    # Validate size
    if not validate_file_size(len(content)):
        raise HTTPException(
            status_code=400,
            detail="File too large"
        )

    await file.seek(0)

    secure_name = generate_file_name(file.filename)

    save_path = os.path.join(
        UPLOAD_FOLDER,
        secure_name
    )

    await save_upload_file(file, save_path)

    # REAL AI PREDICTION
    result = predict_audio(save_path)

    return result
