# schemas.py
from pydantic import BaseModel
from typing import List, Optional, Any

class Signup(BaseModel):
    username: str
    password: str

class Login(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UploadResponse(BaseModel):
    doc_id: str
    filename: str

class ChunkOut(BaseModel):
    chunk_id: str
    text: str
    embedding: List[float]
    metadata: Optional[dict]