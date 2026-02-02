# Backend Setup & Run Guide

## Yêu cầu
- Python 3.11+
- PostgreSQL 15+

## Cài đặt

```bash
cd backend

# Tạo virtual environment
python -m venv .venv
.venv\Scripts\activate  # Windows

# Cài dependencies
pip install -e .

# Copy env file
copy .env.example .env
```

## Chạy PostgreSQL (Docker)

```bash
docker run -d \
  --name adg-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=adg_kms \
  -p 5432:5432 \
  postgres:15
```

## Chạy API Server

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs
