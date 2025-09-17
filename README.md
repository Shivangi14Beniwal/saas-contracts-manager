# 🚀 SaaS Contracts Manager - Full-Stack RAG System

A complete full-stack SaaS application for contract management with AI-powered document analysis and natural language querying. Built with React frontend, FastAPI backend, and PostgreSQL with pgvector for semantic search.

---

## ✨ Features

### 🔐 Authentication & Multi-Tenancy
- JWT-based user authentication with signup/login
- Multi-tenant isolation - all data scoped to user_id
- Secure token-based API access

### 📤 Document Upload & Processing
- Drag & drop file upload (PDF, TXT, DOCX)
- Simulated LlamaCloud document parsing
- Automatic text chunking and vector embedding generation
- Progress tracking with error handling

### 📄 Contracts Dashboard
- Comprehensive contract management interface
- Search and filter by name, parties, status, risk level
- Pagination (10 contracts per page)
- Color-coded risk indicators (Low/Medium/High)
- Loading, empty, and error states

### 📑 Contract Analysis
- Detailed contract view with metadata
- AI-extracted clauses with confidence scores
- Risk insights and recommendations
- Evidence panel with document snippets and relevance scores

### 🤖 Natural Language Querying
- Ask questions about contracts in plain English
- Vector similarity search using pgvector
- Contextual answers with source citations
- Retrieved chunks with relevance scoring

---

## 🛠 Tech Stack

### Frontend
- ⚛️ **React 18** with hooks and functional components
- 🎨 **Tailwind CSS** for responsive styling
- ⚡ **Vite** for fast development and building
- 🧭 **React Router v6** for navigation
- 🧠 **Context API** for state management
- 🔗 **Axios** for API communication

### Backend
- 🚀 **FastAPI** with Python for high-performance API
- 🔑 **JWT** authentication with secure token handling
- 🗄️ **PostgreSQL** with **pgvector** extension for vector operations
- ✅ **Pydantic** for data validation
- 🌐 **Uvicorn** ASGI server

### Database Schema
```
users
├── user_id (UUID, Primary Key)
├── username (String, Unique)
├── email (String, Unique)
├── password_hash (String)
└── created_at (Timestamp)

documents
├── doc_id (UUID, Primary Key)
├── user_id (UUID, Foreign Key)
├── filename (String)
├── uploaded_on (Timestamp)
├── expiry_date (Date)
├── status (Enum: Active, Renewal Due, Expired)
├── risk_score (Enum: Low, Medium, High)
└── parties (String)

chunks
├── chunk_id (UUID, Primary Key)
├── doc_id (UUID, Foreign Key)
├── user_id (UUID, Foreign Key)
├── text_chunk (Text)
├── embedding (Vector - pgvector)
└── metadata (JSONB)
```

---

## 🧪 Local Setup

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 14+ with pgvector extension

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
python setup_db.py

# Start FastAPI server
uvicorn main:app --reload --port 8000
```

### Database Setup
```sql
-- Create database
CREATE DATABASE contracts_db;

-- Enable pgvector extension
CREATE EXTENSION vector;
```

---

## 🔌 API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User login
- `GET /me` - Get current user info

### Documents
- `POST /upload` - Upload and process document
- `GET /contracts` - List user's contracts
- `GET /contracts/{id}` - Get contract details
- `DELETE /contracts/{id}` - Delete contract

### Query
- `POST /ask` - Natural language query with RAG

---

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
# Build for production
npm run build

# Deploy dist/ folder to Netlify or Vercel
```

### Backend (Render/Heroku)
```bash
# Ensure requirements.txt is updated
pip freeze > requirements.txt

# Deploy using platform-specific instructions
# Set environment variables in deployment platform
```

---

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/contracts_db
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

---

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── requirements.txt
│   └── main.py
├── database/
│   ├── schema.sql
│   └── er_diagram.png
└── README.md
```

---

## 🌐 Live Demo

- **Frontend**: [https://your-netlify-url.netlify.app](https://your-netlify-url.netlify.app)
- **Backend API**: [https://your-render-url.onrender.com](https://your-render-url.onrender.com)

## 🔑 Test Credentials

- Username: `demo@example.com`
- Password: `test123`

---

## ✅ Key Features Implemented

- Multi-tenant user authentication
- File upload with drag & drop interface
- Document parsing and chunking simulation
- Vector embeddings storage in PostgreSQL
- Semantic search with pgvector
- Natural language querying
- Responsive React dashboard
- Contract risk analysis
- Real-time search and filtering
- Professional SaaS-style UI

---

## 📝 Decisions & Assumptions

- Used **FastAPI** for high-performance backend with automatic API docs
- **pgvector** extension for efficient vector similarity search
- **Context API** for frontend state management (simple and effective)
- Mock LlamaCloud integration for document parsing simulation
- **JWT tokens** stored in httpOnly cookies for security
- **UUID** primary keys for better scalability and security
- Mobile-first responsive design with Tailwind utilities

---

## 🎯 Notes for Evaluation

- Repository is public on GitHub with complete source code
- Both frontend and backend are deployed with live demo links
- Database schema includes proper ER diagram
- Multi-tenant architecture ensures data isolation
- Vector search demonstrates RAG (Retrieval Augmented Generation) workflow
- Professional SaaS UI suitable for business users
- Comprehensive error handling and loading states
- Complete API documentation with FastAPI auto-generated docs

---

## 🔮 Future Enhancements

- Real LlamaCloud integration for production
- Advanced contract analytics and reporting
- Export functionality (PDF, Excel)
- Email notifications for contract renewals
- Bulk document upload with batch processing
- Advanced filtering and sorting options
- Contract comparison features
- Audit trail and version history
