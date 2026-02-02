"""Document and DocumentVersion SQLAlchemy models."""
import enum
from datetime import datetime
from typing import Optional
from uuid import uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Department(str, enum.Enum):
    """Phòng ban marketing."""
    D2COM = "D2COM"
    B2B = "B2B"
    S2B2C = "S2B2C"
    MARCOM = "MARCOM"


class DocumentStatus(str, enum.Enum):
    """Trạng thái tài liệu."""
    DRAFT = "draft"
    PENDING_APPROVAL = "pending_approval"
    APPROVED = "approved"
    PUBLISHED = "published"
    ARCHIVED = "archived"


class Classification(str, enum.Enum):
    """Phân loại bảo mật."""
    PUBLIC = "public"
    INTERNAL = "internal"
    CONFIDENTIAL = "confidential"


class Document(Base):
    """Tài liệu trong hệ thống KMS."""
    
    __tablename__ = "documents"
    
    # Primary key
    id: Mapped[str] = mapped_column(
        UUID(as_uuid=False), 
        primary_key=True, 
        default=lambda: str(uuid4())
    )
    
    # Core fields
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    department: Mapped[Department] = mapped_column(Enum(Department), nullable=False)
    
    # Status & Classification
    status: Mapped[DocumentStatus] = mapped_column(
        Enum(DocumentStatus), 
        default=DocumentStatus.DRAFT
    )
    classification: Mapped[Classification] = mapped_column(
        Enum(Classification), 
        default=Classification.INTERNAL
    )
    
    # Ownership
    owner_email: Mapped[str] = mapped_column(String(255), nullable=False)
    
    # Google Drive integration
    drive_file_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    drive_folder_path: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    
    # NotebookLM integration
    notebooklm_source_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    # Metadata
    file_type: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    file_size_bytes: Mapped[Optional[int]] = mapped_column(nullable=True)
    
    # Review cycle
    review_date: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    
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
    
    # Relationships
    versions: Mapped[list["DocumentVersion"]] = relationship(
        back_populates="document",
        cascade="all, delete-orphan",
        order_by="DocumentVersion.version_number.desc()"
    )
    
    def __repr__(self) -> str:
        return f"<Document {self.id[:8]}... '{self.title}'>"


class DocumentVersion(Base):
    """Phiên bản của tài liệu."""
    
    __tablename__ = "document_versions"
    
    # Primary key
    id: Mapped[str] = mapped_column(
        UUID(as_uuid=False), 
        primary_key=True, 
        default=lambda: str(uuid4())
    )
    
    # Foreign key
    document_id: Mapped[str] = mapped_column(
        UUID(as_uuid=False), 
        ForeignKey("documents.id", ondelete="CASCADE"),
        nullable=False
    )
    
    # Version info
    version_number: Mapped[int] = mapped_column(nullable=False, default=1)
    changelog: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    # File paths
    archive_path: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    published_path: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now()
    )
    
    # Relationship
    document: Mapped["Document"] = relationship(back_populates="versions")
    
    def __repr__(self) -> str:
        return f"<DocumentVersion v{self.version_number} of {self.document_id[:8]}...>"
