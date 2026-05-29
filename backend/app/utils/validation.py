ALLOWED_EXTENSIONS = {"mp3", "wav", "m4a", "webm"}

MAX_FILE_SIZE = 25 * 1024 * 1024  # 25MB


def validate_file_extension(filename: str):
    extension = filename.split(".")[-1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        return False

    return True


def validate_file_size(file_size: int):
    if file_size > MAX_FILE_SIZE:
        return False

    return True
