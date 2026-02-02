"""FastAPI main application."""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.routers import chat, documents, golden_answers, stats


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    print("🚀 ADG KMS API starting...")
    yield
    # Shutdown
    print("👋 ADG KMS API shutting down...")


settings = get_settings()

app = FastAPI(
    title="ADG Knowledge Management System",
    description="API cho hệ thống quản lý tri thức Marketing ADG",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(golden_answers.router, prefix="/api/golden-answers", tags=["Golden Answers"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(stats.router, prefix="/api/stats", tags=["Statistics"])


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "name": "ADG Knowledge Management System",
        "version": "0.1.0",
        "status": "running",
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}
