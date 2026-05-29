import os
import uuid
import aiofiles


UPLOAD_DIR = "uploads"


def generate_file_name(filename: str):
    extension = filename.split(".")[-1]

    unique_name = f"{uuid.uuid4()}.{extension}"

    return unique_name


async def save_upload_file(file, destination: str):

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    async with aiofiles.open(destination, "wb") as out_file:
        content = await file.read()
        await out_file.write(content)

    return destination
