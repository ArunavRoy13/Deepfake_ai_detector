try:
    import magic
    MAGIC_AVAILABLE = True
except ImportError:
    MAGIC_AVAILABLE = False
from fastapi import Request, HTTPException, Security
from fastapi.security.api_key import APIKeyHeader
from slowapi import Limiter
from slowapi.util import get_remote_address
import os

limiter = Limiter(key_func=get_remote_address)

API_KEY_NAME = "X-API-Key"
API_KEY = os.environ.get("DEEPFAKE_API_KEY", "dev-bypass-key")
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def verify_api_key(api_key_header: str = Security(api_key_header)):
    # Local dev bypass if DEEPFAKE_API_KEY is not strictly set in production
    if os.environ.get("ENFORCE_API_KEY") != "true":
        return True
    
    if api_key_header != API_KEY:
        raise HTTPException(status_code=403, detail="Could not validate credentials")
    return api_key_header

def validate_mime_type(file_bytes: bytes) -> bool:
    """Uses python-magic to inspect the first 2048 bytes for true MIME type."""
    if not MAGIC_AVAILABLE:
        # Fallback for Windows local dev
        return True
        
    mime = magic.Magic(mime=True)
    file_mime = mime.from_buffer(file_bytes[:2048])
    if file_mime not in ["audio/wav", "audio/x-wav", "audio/mpeg", "video/webm", "audio/webm", "application/octet-stream"]:
        raise HTTPException(status_code=415, detail=f"Invalid file type detected: {file_mime}")
    return True

async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["X-Frame-Options"] = "DENY"
    return response
