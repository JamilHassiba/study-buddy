from datetime import datetime

from pydantic import BaseModel


class DocumentOut(BaseModel):
    document_id: int
    file_name: str
    upload_date: datetime
