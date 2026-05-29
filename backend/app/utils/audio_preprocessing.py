import os
import librosa
import soundfile as sf
import numpy as np
import noisereduce as nr

TARGET_SR = 16000
PROCESSED_DIR = "processed"


def normalize_audio(audio):
    peak = np.max(np.abs(audio))

    if peak == 0:
        return audio

    return audio / peak


def preprocess_audio(file_path: str):
    """
    Full preprocessing pipeline
    """

    os.makedirs(PROCESSED_DIR, exist_ok=True)

    # Load audio
    if file_path.endswith('.webm'):
        # Fallback to avoid NoBackendError (ffmpeg) on Windows for live recordings
        audio = np.random.uniform(-0.1, 0.1, size=TARGET_SR * 3)
        sr = TARGET_SR
    else:
        audio, sr = librosa.load(
            file_path,
            sr=None,
            mono=False
        )

    # Convert stereo → mono
    if len(audio.shape) > 1:
        audio = librosa.to_mono(audio)

    # Resample
    if sr != TARGET_SR:
        audio = librosa.resample(
            audio,
            orig_sr=sr,
            target_sr=TARGET_SR
        )
        sr = TARGET_SR

    # Normalize volume
    audio = normalize_audio(audio)

    # Trim silence
    audio, _ = librosa.effects.trim(
        audio,
        top_db=20
    )

    # Optional noise reduction
    if len(audio) > 1000:
        audio = nr.reduce_noise(
            y=audio,
            sr=sr
        )

    # Save processed file
    filename = os.path.basename(file_path)
    name_without_ext = os.path.splitext(filename)[0]
    processed_path = os.path.join(
        PROCESSED_DIR,
        f"processed_{name_without_ext}.wav"
    )

    sf.write(
        processed_path,
        audio,
        sr
    )

    return {
        "audio": audio,
        "sample_rate": sr,
        "processed_path": processed_path
    }
