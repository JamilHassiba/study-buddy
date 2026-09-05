from datetime import datetime

from pydantic import BaseModel


class DocumentOut(BaseModel):
    document_id: int
    file_name: str
    upload_date: datetime


class ChatRequest(BaseModel):
    document_id: int
    query: str


class SourceOut(BaseModel):
    index: int
    content: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceOut]
