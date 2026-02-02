"""Documents API router."""
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.document import Department, Document, DocumentStatus
from app.schemas import DocumentCreate, DocumentListResponse, DocumentResponse, DocumentUpdate

router = APIRouter()


@router.get("/", response_model=DocumentListResponse)
async def list_documents(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    department: Optional[Department] = None,
    status: Optional[DocumentStatus] = None,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
):
    """Lấy danh sách tài liệu với phân trang và lọc."""
    query = select(Document)
    
    # Filters
    if department:
        query = query.where(Document.department == department)
    if status:
        query = query.where(Document.status == status)
    if search:
        query = query.where(Document.title.ilike(f"%{search}%"))
    
    # Count total
    count_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(count_query) or 0
    
    # Pagination
    query = query.offset((page - 1) * page_size).limit(page_size)
    query = query.order_by(Document.updated_at.desc())
    
    result = await db.execute(query)
    documents = result.scalars().all()
    
    return DocumentListResponse(
        items=[DocumentResponse.model_validate(doc) for doc in documents],
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(
    document_id: str,
    db: AsyncSession = Depends(get_db),
):
    """Lấy chi tiết một tài liệu."""
    result = await db.execute(
        select(Document).where(Document.id == document_id)
    )
    document = result.scalar_one_or_none()
    
    if not document:
        raise HTTPException(status_code=404, detail="Không tìm thấy tài liệu")
    
    return DocumentResponse.model_validate(document)


@router.post("/", response_model=DocumentResponse, status_code=201)
async def create_document(
    doc_in: DocumentCreate,
    db: AsyncSession = Depends(get_db),
):
    """Tạo tài liệu mới."""
    document = Document(**doc_in.model_dump())
    db.add(document)
    await db.flush()
    await db.refresh(document)
    
    return DocumentResponse.model_validate(document)


@router.patch("/{document_id}", response_model=DocumentResponse)
async def update_document(
    document_id: str,
    doc_in: DocumentUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Cập nhật tài liệu."""
    result = await db.execute(
        select(Document).where(Document.id == document_id)
    )
    document = result.scalar_one_or_none()
    
    if not document:
        raise HTTPException(status_code=404, detail="Không tìm thấy tài liệu")
    
    update_data = doc_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(document, field, value)
    
    await db.flush()
    await db.refresh(document)
    
    return DocumentResponse.model_validate(document)


@router.delete("/{document_id}", status_code=204)
async def delete_document(
    document_id: str,
    db: AsyncSession = Depends(get_db),
):
    """Xóa tài liệu."""
    result = await db.execute(
        select(Document).where(Document.id == document_id)
    )
    document = result.scalar_one_or_none()
    
    if not document:
        raise HTTPException(status_code=404, detail="Không tìm thấy tài liệu")
    
    await db.delete(document)
