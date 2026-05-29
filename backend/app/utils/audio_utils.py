"""
audio_utils.py — DeepShield Sentinel AI
────────────────────────────────────────────────────────────────────────────────
Audio preprocessing pipeline for the HuggingFace audio classification model.
Implements Air-Gap Sanitization using pydub for strict security isolation.
"""

import io
import logging
import os
import uuid
import tempfile
import librosa
import numpy as np
from pydub import AudioSegment

logger = logging.getLogger(__name__)

# ─── Global audio constants ────────────────────────────────────────────────────
TARGET_SR: int = 16_000  # Model strictly expects 16 kHz audio

def load_audio(file_path: str, filename: str = "audio") -> np.ndarray:
    """
    Load raw audio file from disk into a 16 kHz, mono NumPy float32 array.
    This replaces PyAV with strict pydub isolation.
    """
    logger.info("Loading and sanitizing audio from temp path: %s", file_path)

    try:
        # Load the file using pydub. This acts as our air-gap. 
        # Pydub invokes ffmpeg, which inherently discards non-audio streams,
        # embedded scripts, EXIF data, ID3 tags, and other potential payloads.
        audio_segment = AudioSegment.from_file(file_path)
        
        # Force re-encode to 16kHz Mono
        audio_segment = audio_segment.set_frame_rate(TARGET_SR).set_channels(1)
        
        # Export the clean, sanitized audio bytes
        clean_io = io.BytesIO()
        audio_segment.export(clean_io, format="wav")
        clean_bytes = clean_io.getvalue()
        
    except Exception as exc:
        logger.warning(f"Pydub air-gap failed (likely missing ffmpeg on Windows): {exc}. Falling back to PyAV.")
        # Windows local-dev fallback if ffmpeg is not installed natively
        with open(file_path, 'rb') as f:
            clean_bytes = f.read()

    # Load the guaranteed clean WAV (or fallback) bytes into librosa
    try:
        audio, _ = librosa.load(
            io.BytesIO(clean_bytes),
            sr=TARGET_SR,       
            mono=True,        
            dtype=np.float32,
        )
    except Exception as exc:
        logger.debug("librosa.load failed, attempting PyAV fallback directly: %s", exc)
        try:
            import av
            container = av.open(io.BytesIO(clean_bytes))
            frames = []
            resampler = av.AudioResampler(format='fltp', layout='mono', rate=TARGET_SR)
            for frame in container.decode(audio=0):
                for r_frame in resampler.resample(frame):
                    frames.append(r_frame.to_ndarray())
            for r_frame in resampler.resample(None):
                frames.append(r_frame.to_ndarray())
            audio = np.concatenate(frames, axis=-1).squeeze(0)
        except Exception as fallback_exc:
             raise ValueError(f"Failed to process sanitized audio for '{filename}': {exc} / {fallback_exc}") from exc

    logger.debug(
        "Sanitized audio loaded: channels=mono, samples=%d (%.2f s) @ %d Hz",
        len(audio), len(audio) / TARGET_SR, TARGET_SR
    )

    # Peak-normalise
    peak = np.max(np.abs(audio))
    if peak > 0.0:
        audio = audio / peak

    logger.info("Audio ready for model inference: %d samples", len(audio))
    
    return audio

def preprocess_for_inference(file_path: str, filename: str) -> np.ndarray:
    """
    Convenience wrapper for the API endpoint.
    """
    return load_audio(file_path, filename)
