"""Statistics API router."""
from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.document import Document, DocumentStatus
from app.schemas import DashboardStats

router = APIRouter()


@router.get("/dashboard", response_model=DashboardStats)
async def get_dashboard_stats(db: AsyncSession = Depends(get_db)):
    """Lấy thống kê cho Dashboard."""
    
    # Total documents
    total_result = await db.execute(select(func.count(Document.id)))
    total_documents = total_result.scalar() or 0
    
    # Active documents (Published or Approved)
    active_result = await db.execute(
        select(func.count(Document.id)).where(
            Document.status.in_([DocumentStatus.PUBLISHED, DocumentStatus.APPROVED])
        )
    )
    active_documents = active_result.scalar() or 0
    
    # Metadata alerts (documents pending approval)
    alerts_result = await db.execute(
        select(func.count(Document.id)).where(
            Document.status == DocumentStatus.PENDING_APPROVAL
        )
    )
    metadata_alerts = alerts_result.scalar() or 0
    
    return DashboardStats(
        total_documents=total_documents,
        active_documents=active_documents,
        metadata_alerts=metadata_alerts,
        ai_queries_count=0,  # TODO: Track from chat logs
        total_documents_change="+5%",
        active_documents_change="+12%",
        ai_queries_change="+18%",
    )


@router.get("/departments")
async def get_department_stats(db: AsyncSession = Depends(get_db)):
    """Lấy thống kê theo phòng ban."""
    result = await db.execute(
        select(Document.department, func.count(Document.id))
        .group_by(Document.department)
    )
    
    stats = {}
    for row in result:
        stats[row[0].value] = row[1]
    
    return {"departments": stats}
