from typing import Annotated

from app.database import get_db
from app.schemas import ChatRequest, ChatResponse, SourceOut
from app.services.embeddings import embed_query
from app.services.llm import generate_answer
from app.services.retrieval import retrieve_chunks
from fastapi import APIRouter, Depends, HTTPException
from psycopg2.extensions import connection
from psycopg2.extras import RealDictCursor

router = APIRouter()

DbConn = Annotated[connection, Depends(get_db)]


@router.post("/chat")
def return_ai_response(request: ChatRequest, conn: DbConn) -> ChatResponse:
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        cursor.execute(
            "SELECT 1 FROM documents WHERE document_id = %s;",
            (request.document_id,),
        )
        if not cursor.fetchone():
            raise HTTPException(
                status_code=404,
                detail=f"Document ID: {request.document_id} could not be found in database.",
            )

        embedding = embed_query(request.query)
        retrieved_chunks = retrieve_chunks(cursor, request.document_id, embedding)
        answer = generate_answer(request.query, retrieved_chunks)

        sources = [SourceOut(**chunk) for chunk in retrieved_chunks]
        return ChatResponse(answer=answer, sources=sources)
