import os
import pandas as pd

from utils.audio_preprocessing import preprocess_audio
from utils.feature_extraction import extract_features


DATASET_PATH = "dataset"


def process_folder(folder_path, label):
    rows = []

    for filename in os.listdir(folder_path):

        if not filename.lower().endswith((".wav", ".mp3", ".m4a")):
            continue

        file_path = os.path.join(folder_path, filename)

        try:
            processed = preprocess_audio(file_path)

            audio = processed["audio"]
            sr = processed["sample_rate"]

            features = extract_features(audio, sr)

            row = features.tolist()
            row.append(label)

            rows.append(row)

            print(f"Processed: {filename}")

        except Exception as e:
            print(f"Error processing {filename}: {e}")

    return rows


def build_dataset():
    real_path = os.path.join(DATASET_PATH, "real")
    fake_path = os.path.join(DATASET_PATH, "fake")

    real_rows = process_folder(real_path, 0)
    fake_rows = process_folder(fake_path, 1)

    all_rows = real_rows + fake_rows

    if len(all_rows) == 0:
        print("No audio files found. Add some to dataset/real and dataset/fake to build dataset.")
        return

    df = pd.DataFrame(all_rows)

    df.to_csv("audio_features.csv", index=False)

    print("Dataset built successfully")


if __name__ == "__main__":
    build_dataset()
