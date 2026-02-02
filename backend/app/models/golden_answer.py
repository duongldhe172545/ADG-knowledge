"""GoldenAnswer SQLAlchemy model."""
import enum
from datetime import datetime
from typing import Optional
from uuid import uuid4

from sqlalchemy import DateTime, Enum, String, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.document import Department


class TrustLabel(str, enum.Enum):
    """Mức độ tin cậy của Golden Answer."""
    ASSUMPTION = "assumption"      # Chưa xác minh
    VERIFIED = "verified"          # Đã xác minh bởi chuyên gia
    POLICY = "policy"              # Chính sách chính thức
    DEPRECATED = "deprecated"      # Đã lỗi thời


class GoldenAnswer(Base):
    """Câu trả lời chuẩn đã được xác minh."""
    
    __tablename__ = "golden_answers"
    
    # Primary key
    id: Mapped[str] = mapped_column(
        UUID(as_uuid=False), 
        primary_key=True, 
        default=lambda: str(uuid4())
    )
    
    # Question & Answer
    question: Mapped[str] = mapped_column(Text, nullable=False)
    answer: Mapped[str] = mapped_column(Text, nullable=False)
    
    # Department & Trust
    department: Mapped[Department] = mapped_column(Enum(Department), nullable=False)
    trust_label: Mapped[TrustLabel] = mapped_column(
        Enum(TrustLabel), 
        default=TrustLabel.ASSUMPTION
    )
    
    # Source documents
    source_document_ids: Mapped[list[str]] = mapped_column(
        ARRAY(String), 
        default=list
    )
    
    # Citations (JSON-like text for simplicity)
    citations: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    # Verification
    verified_by: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    verified_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), 
        nullable=True
    )
    
    # Review cycle
    next_review_date: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), 
        nullable=True
    )
    
    # Usage stats
    usage_count: Mapped[int] = mapped_column(default=0)
    helpful_count: Mapped[int] = mapped_column(default=0)
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        onupdate=func.now()
    )
    
    def __repr__(self) -> str:
        return f"<GoldenAnswer {self.id[:8]}... Q: '{self.question[:30]}...'>"
