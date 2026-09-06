from typing import Annotated

from app.database import get_db
from app.schemas import DocumentOut
from app.services.ingestion import ingest_document
from fastapi import APIRouter, Depends, HTTPException, UploadFile
from psycopg2 import Binary
from psycopg2.extensions import connection
from psycopg2.extras import RealDictCursor

router = APIRouter()

DbConn = Annotated[connection, Depends(get_db)]

MAX_SIZE_BYTES = 20 * (1024 * 1024)


@router.post("/documents")
def post_document(document: UploadFile, conn: DbConn) -> DocumentOut:
    if document.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{document.content_type}'. Only PDF files are accepted.",
        )

    file_bytes = document.file.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    if len(file_bytes) > MAX_SIZE_BYTES:
        raise HTTPException(
            status_code=400,
            detail=f"File is too large ({len(file_bytes) // (1024 * 1024)}MB). Maximum size is {MAX_SIZE_BYTES / (1024 * 1024)}MB.",
        )

    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        query = """
            INSERT INTO documents (file_name, file_bytes)
            VALUES (%s, %s)
            RETURNING document_id, file_name, upload_date;
        """
        data = (document.filename, Binary(file_bytes))

        cursor.execute(query, data)
        row = cursor.fetchone()

        if row is None:
            raise HTTPException(
                status_code=500, detail="Could not save document. Please try again."
            )

        try:
            ingest_document(cursor, row["document_id"], file_bytes)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    conn.commit()
    return DocumentOut(**row)
