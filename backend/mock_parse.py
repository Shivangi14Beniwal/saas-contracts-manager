# mock_parse.py
import uuid
def mock_llamacloud_parse(filename: str, file_bytes) -> dict:
    # very simple: split text by sentences / lines
    text = ""
    try:
        text = file_bytes.decode('utf-8')
    except:
        text = f"Parsed content of {filename}"
    chunks = []
    # simple fake chunks
    chunks.append({
        "chunk_id": str(uuid.uuid4()),
        "text": f"Termination clause: Either party may terminate with 90 days’ notice. (from {filename})",
        "embedding": [0.12, -0.45, 0.91, 0.33],
        "metadata": {"page": 1, "contract_name": filename}
    })
    chunks.append({
        "chunk_id": str(uuid.uuid4()),
        "text": f"Liability cap: Limited to 12 months’ fees. (from {filename})",
        "embedding": [0.01, 0.22, -0.87, 0.44],
        "metadata": {"page": 2, "contract_name": filename}
    })
    return {"document_id": str(uuid.uuid4()), "chunks": chunks}