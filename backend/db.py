# db.py
from typing import Dict, List
import time
import uuid

# Simple in-memory "DB" (for demo). Replace with Postgres + pgvector for real.
USERS: Dict[str, dict] = {}
DOCUMENTS: Dict[str, dict] = {}
CHUNKS: Dict[str, dict] = {}

def create_user(username: str, password_hash: str):
    user_id = str(uuid.uuid4())
    USERS[user_id] = {"user_id": user_id, "username": username, "password_hash": password_hash}
    return USERS[user_id]

def find_user_by_username(username: str):
    for u in USERS.values():
        if u["username"] == username:
            return u
    return None

def get_user(user_id: str):
    return USERS.get(user_id)

def add_document(user_id: str, filename: str, expiry_date: str = None, status: str = "Active", risk_score: str = "Low"):
    doc_id = str(uuid.uuid4())
    DOCUMENTS[doc_id] = {
        "doc_id": doc_id,
        "user_id": user_id,
        "filename": filename,
        "uploaded_on": int(time.time()),
        "expiry_date": expiry_date,
        "status": status,
        "risk_score": risk_score,
    }
    return DOCUMENTS[doc_id]

def list_documents_for_user(user_id: str):
    return [d for d in DOCUMENTS.values() if d["user_id"] == user_id]

def get_document(doc_id: str):
    return DOCUMENTS.get(doc_id)

def add_chunk(doc_id: str, user_id: str, chunk_id: str, text_chunk: str, embedding: list, metadata: dict):
    CHUNKS[chunk_id] = {
        "chunk_id": chunk_id,
        "doc_id": doc_id,
        "user_id": user_id,
        "text_chunk": text_chunk,
        "embedding": embedding,
        "metadata": metadata
    }
    return CHUNKS[chunk_id]

def get_chunks_for_doc(doc_id: str):
    return [c for c in CHUNKS.values() if c["doc_id"] == doc_id]

def vector_search_mock(query_embedding: list, user_id: str, top_k: int = 3):
    # simple similarity by dot product / cosine approximation for demo
    def score(e1, e2):
        # assume same length; use dot product
        return sum(a*b for a,b in zip(e1,e2))
    results = []
    for c in CHUNKS.values():
        if c["user_id"] != user_id: continue
        emb = c["embedding"]
        try:
            s = score(query_embedding, emb)
        except:
            s = 0.0
        results.append((s, c))
    results.sort(key=lambda x: x[0], reverse=True)
    return [{"relevance": r, "chunk": c} for r,c in results[:top_k]]