"""Database models package."""
from app.models.document import Document, DocumentVersion
from app.models.golden_answer import GoldenAnswer

__all__ = ["Document", "DocumentVersion", "GoldenAnswer"]
