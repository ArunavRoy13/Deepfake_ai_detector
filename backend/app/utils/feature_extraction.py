import librosa
import numpy as np


def extract_pitch(audio, sr):
    """
    Extract average pitch
    """
    pitches, magnitudes = librosa.piptrack(
        y=audio,
        sr=sr
    )

    pitch_values = pitches[magnitudes > np.median(magnitudes)]

    if len(pitch_values) == 0:
        return 0.0

    return float(np.mean(pitch_values))


def extract_features(audio, sr):
    """
    Extract ML features from audio
    """

    feature_vector = []

    # -----------------------------
    # MFCC (13 coefficients)
    # -----------------------------
    mfcc = librosa.feature.mfcc(
        y=audio,
        sr=sr,
        n_mfcc=13
    )

    mfcc_mean = np.mean(mfcc, axis=1)
    feature_vector.extend(mfcc_mean)

    # -----------------------------
    # Spectral centroid
    # -----------------------------
    spectral_centroid = librosa.feature.spectral_centroid(
        y=audio,
        sr=sr
    )

    feature_vector.append(
        np.mean(spectral_centroid)
    )

    # -----------------------------
    # Zero crossing rate
    # -----------------------------
    zcr = librosa.feature.zero_crossing_rate(audio)

    feature_vector.append(
        np.mean(zcr)
    )

    # -----------------------------
    # Chroma features
    # -----------------------------
    chroma = librosa.feature.chroma_stft(
        y=audio,
        sr=sr
    )

    chroma_mean = np.mean(chroma, axis=1)
    feature_vector.extend(chroma_mean)

    # -----------------------------
    # RMS energy
    # -----------------------------
    rms = librosa.feature.rms(y=audio)

    feature_vector.append(
        np.mean(rms)
    )

    # -----------------------------
    # Pitch
    # -----------------------------
    pitch = extract_pitch(audio, sr)

    feature_vector.append(pitch)

    # -----------------------------
    # Spectral bandwidth
    # -----------------------------
    bandwidth = librosa.feature.spectral_bandwidth(
        y=audio,
        sr=sr
    )

    feature_vector.append(
        np.mean(bandwidth)
    )

    # -----------------------------
    # Spectral rolloff
    # -----------------------------
    rolloff = librosa.feature.spectral_rolloff(
        y=audio,
        sr=sr
    )

    feature_vector.append(
        np.mean(rolloff)
    )

    # -----------------------------
    # Tempo
    # -----------------------------
    tempo, _ = librosa.beat.beat_track(
        y=audio,
        sr=sr
    )

    # NOTE: beat_track returns tempo as a float or an array depending on librosa version. 
    # Usually it's an array for recent versions, so we use tempo[0] if it's an array, otherwise tempo
    if isinstance(tempo, np.ndarray):
        feature_vector.append(float(tempo[0]))
    else:
        feature_vector.append(float(tempo))

    return np.array(feature_vector)
