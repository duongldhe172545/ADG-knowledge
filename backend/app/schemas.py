"""Pydantic schemas for API request/response."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.models.document import Classification, Department, DocumentStatus
from app.models.golden_answer import TrustLabel


# ============== Document Schemas ==============

class DocumentBase(BaseModel):
    """Base document schema."""
    title: str = Field(..., min_length=1, max_length=500)
    description: Optional[str] = None
    department: Department
    classification: Classification = Classification.INTERNAL
    owner_email: str


class DocumentCreate(DocumentBase):
    """Schema for creating a document."""
    file_type: Optional[str] = None
    file_size_bytes: Optional[int] = None
    review_date: Optional[datetime] = None


class DocumentUpdate(BaseModel):
    """Schema for updating a document."""
    title: Optional[str] = Field(None, min_length=1, max_length=500)
    description: Optional[str] = None
    department: Optional[Department] = None
    classification: Optional[Classification] = None
    status: Optional[DocumentStatus] = None
    review_date: Optional[datetime] = None


class DocumentResponse(DocumentBase):
    """Schema for document response."""
    id: str
    status: DocumentStatus
    file_type: Optional[str]
    file_size_bytes: Optional[int]
    drive_file_id: Optional[str]
    notebooklm_source_id: Optional[str]
    review_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class DocumentListResponse(BaseModel):
    """Paginated document list response."""
    items: list[DocumentResponse]
    total: int
    page: int
    page_size: int


# ============== Golden Answer Schemas ==============

class GoldenAnswerBase(BaseModel):
    """Base golden answer schema."""
    question: str = Field(..., min_length=5)
    answer: str = Field(..., min_length=10)
    department: Department


class GoldenAnswerCreate(GoldenAnswerBase):
    """Schema for creating a golden answer."""
    source_document_ids: list[str] = []
    citations: Optional[str] = None


class GoldenAnswerResponse(GoldenAnswerBase):
    """Schema for golden answer response."""
    id: str
    trust_label: TrustLabel
    source_document_ids: list[str]
    citations: Optional[str]
    verified_by: Optional[str]
    verified_at: Optional[datetime]
    usage_count: int
    helpful_count: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# ============== Chat Schemas ==============

class ChatRequest(BaseModel):
    """Schema for chat query request."""
    query: str = Field(..., min_length=1)
    source_ids: Optional[list[str]] = None
    conversation_id: Optional[str] = None


class Citation(BaseModel):
    """Citation from a source document."""
    source_id: str
    source_title: str
    text: str
    page: Optional[int] = None


class ChatResponse(BaseModel):
    """Schema for chat response."""
    answer: str
    citations: list[Citation] = []
    conversation_id: str
    suggested_queries: list[str] = []


# ============== Stats Schemas ==============

class DashboardStats(BaseModel):
    """Dashboard statistics."""
    total_documents: int
    active_documents: int
    metadata_alerts: int
    ai_queries_count: int
    total_documents_change: str = "+0%"
    active_documents_change: str = "+0%"
    ai_queries_change: str = "+0%"
