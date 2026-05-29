"""
security_utils.py — Defense-in-Depth layer for Deepfake Detector
Contains rate limiters, magic byte validators, and API Key dependencies.
"""

import os
from fastapi import HTTPException, Security, Request
from fastapi.security.api_key import APIKeyHeader
from slowapi import Limiter
from slowapi.util import get_remote_address

# 1. Rate Limiting (slowapi)
# Limits users to 5 requests per minute per IP address
limiter = Limiter(key_func=get_remote_address)

# 2. API Key Authentication
# The frontend doesn't send this yet, so we allow bypassing it locally if it's not provided.
# To enforce it, set ENFORCE_API_KEY=true in the environment.
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def get_api_key(api_key_header: str = Security(api_key_header)):
    enforce_key = os.getenv("ENFORCE_API_KEY", "false").lower() == "true"
    expected_key = os.getenv("API_KEY", "deepfake-secret-key")
    
    if enforce_key:
        if api_key_header != expected_key:
            raise HTTPException(
                status_code=401, 
                detail="Invalid or missing X-API-Key header."
            )
    return api_key_header

# 3. Magic Byte Validation (Pure Python fallback for cross-platform stability)
def validate_audio_magic_bytes(file_bytes: bytes) -> str:
    """
    Inspects the first few bytes of the file to determine the true format.
    Rejects the file if it is not a permitted audio/video container, preventing payload smuggling.
    """
    if len(file_bytes) < 12:
        raise HTTPException(status_code=400, detail="File too small to be valid audio.")

    header = file_bytes[:12]
    
    # WAV (RIFF...WAVE)
    if header.startswith(b"RIFF") and b"WAVE" in header:
        return "audio/wav"
    # OGG (OggS)
    elif header.startswith(b"OggS"):
        return "audio/ogg"
    # FLAC (fLaC)
    elif header.startswith(b"fLaC"):
        return "audio/flac"
    # MP3 (ID3 or sync word 0xFF 0xFB)
    elif header.startswith(b"ID3") or header.startswith(b"\xff\xfb") or header.startswith(b"\xff\xf3") or header.startswith(b"\xff\xfa"):
        return "audio/mpeg"
    # WEBM/MKV (\x1a\x45\xdf\xa3)
    elif header.startswith(b"\x1a\x45\xdf\xa3"):
        return "video/webm"
    # MP4/M4A (ftypM4A or similar)
    elif b"ftyp" in header:
        return "audio/mp4"

    raise HTTPException(
        status_code=400,
        detail="Security Alert: Invalid file signature detected. Only standard audio files are permitted."
    )
