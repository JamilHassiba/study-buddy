from io import BytesIO

from pypdf import PdfReader
from pypdf.errors import PdfReadError


def extract_text(file_bytes: bytes) -> str:
    try:
        reader = PdfReader(BytesIO(file_bytes))
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""  # If None was returned
            text += "\n"  # Separate between last word and next page's first word
    except PdfReadError:
        raise ValueError("Could not read the PDF file.")

    if not text.strip():
        raise ValueError("PDF contains no extractable text.")

    return text


def chunk_text(text: str, chunk_size: int = 250, overlap: int = 50) -> list[str]:
    if overlap >= chunk_size:
        raise ValueError("overlap must be smaller than chunk_size")

    chunks = []
    step = chunk_size - overlap

    words = text.split()
    for chunk_start in range(0, len(words), step):
        chunk_end = chunk_start + chunk_size
        chunk = words[chunk_start:chunk_end]
        chunks.append(" ".join(chunk))

        # Break cuz last chunk would be just a duplicate from the overlap
        if chunk_end >= len(words):
            break

    return chunks
