from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Header
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import List
from auth import get_password_hash, verify_password, create_access_token, decode_token
import db, mock_parse, schemas
from datetime import datetime

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # used for docs only


def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing auth")
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Bad auth header")
    token = authorization.split(" ", 1)[1]
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_id = payload.get("user_id")
    user = db.get_user(user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


@app.post("/signup")
def signup(body: schemas.Signup):
    existing = db.find_user_by_username(body.username)
    if existing:
        raise HTTPException(400, "username exists")
    pwd = get_password_hash(body.password)
    user = db.create_user(body.username, pwd)
    token = create_access_token({"user_id": user["user_id"], "username": user["username"]})
    return {"access_token": token}


@app.post("/login")
def login(body: schemas.Login):
    user = db.find_user_by_username(body.username)
    if not user or not verify_password(body.password, user["password_hash"]):
        raise HTTPException(401, "Invalid credentials")
    token = create_access_token({"user_id": user["user_id"], "username": user["username"]})
    return {"access_token": token}


@app.get("/contracts")
def list_contracts(current_user=Depends(get_current_user)):
    user_id = current_user["user_id"]
    docs = db.list_documents_for_user(user_id)
    return docs


@app.get("/contracts/{doc_id}")
def contract_detail(doc_id: str, current_user=Depends(get_current_user)):
    d = db.get_document(doc_id)
    if not d or d["user_id"] != current_user["user_id"]:
        raise HTTPException(404, "Not found")
    chunks = db.get_chunks_for_doc(doc_id)
    return {
        **d,
        "clauses": [{"title": "Termination", "summary": "90 days notice", "confidence": 0.82}],
        "insights": [{"risk": "High", "message": "Liability cap excludes data breach costs."}],
        "evidence": [{"source": "Section 12.2", "snippet": "Total liability limited to 12 months fees.", "relevance": 0.91}],
        "chunks": chunks
    }


@app.post("/upload")
async def upload_file(file: UploadFile = File(...), current_user=Depends(get_current_user)):
    content = await file.read()
    doc = db.add_document(current_user["user_id"], file.filename)
    parsed = mock_parse.mock_llamacloud_parse(file.filename, content)
    for ch in parsed["chunks"]:
        db.add_chunk(doc["doc_id"], current_user["user_id"], ch["chunk_id"], ch["text"], ch["embedding"], ch["metadata"])
    return {"doc_id": doc["doc_id"], "filename": doc["filename"]}


class AskRequest(BaseModel):
    query: str


@app.post("/ask")
def ask(req: AskRequest, current_user=Depends(get_current_user)):
    q_emb = [0.1, 0.2, 0.3, 0.4]
    results = db.vector_search_mock(q_emb, current_user["user_id"], top_k=3)
    answer = "Mock answer generated for your query. Refer to retrieved chunks."
    hits = []
    for r in results:
        hits.append({
            "relevance": r["relevance"],
            "chunk_id": r["chunk"]["chunk_id"],
            "text": r["chunk"]["text"],
            "metadata": r["chunk"]["metadata"]
        })
    return {"answer": answer, "hits": hits}
