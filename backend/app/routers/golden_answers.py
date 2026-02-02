"""Golden Answers API router."""
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.document import Department
from app.models.golden_answer import GoldenAnswer, TrustLabel
from app.schemas import GoldenAnswerCreate, GoldenAnswerResponse

router = APIRouter()


@router.get("/", response_model=list[GoldenAnswerResponse])
async def list_golden_answers(
    department: Optional[Department] = None,
    trust_label: Optional[TrustLabel] = None,
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """Lấy danh sách Golden Answers."""
    query = select(GoldenAnswer)
    
    if department:
        query = query.where(GoldenAnswer.department == department)
    if trust_label:
        query = query.where(GoldenAnswer.trust_label == trust_label)
    
    query = query.order_by(GoldenAnswer.usage_count.desc()).limit(limit)
    
    result = await db.execute(query)
    answers = result.scalars().all()
    
    return [GoldenAnswerResponse.model_validate(a) for a in answers]


@router.get("/{answer_id}", response_model=GoldenAnswerResponse)
async def get_golden_answer(
    answer_id: str,
    db: AsyncSession = Depends(get_db),
):
    """Lấy chi tiết Golden Answer."""
    result = await db.execute(
        select(GoldenAnswer).where(GoldenAnswer.id == answer_id)
    )
    answer = result.scalar_one_or_none()
    
    if not answer:
        raise HTTPException(status_code=404, detail="Không tìm thấy Golden Answer")
    
    return GoldenAnswerResponse.model_validate(answer)


@router.post("/", response_model=GoldenAnswerResponse, status_code=201)
async def create_golden_answer(
    answer_in: GoldenAnswerCreate,
    db: AsyncSession = Depends(get_db),
):
    """Tạo Golden Answer mới."""
    answer = GoldenAnswer(**answer_in.model_dump())
    db.add(answer)
    await db.flush()
    await db.refresh(answer)
    
    return GoldenAnswerResponse.model_validate(answer)


@router.post("/{answer_id}/helpful")
async def mark_helpful(
    answer_id: str,
    db: AsyncSession = Depends(get_db),
):
    """Đánh dấu Golden Answer là hữu ích."""
    result = await db.execute(
        select(GoldenAnswer).where(GoldenAnswer.id == answer_id)
    )
    answer = result.scalar_one_or_none()
    
    if not answer:
        raise HTTPException(status_code=404, detail="Không tìm thấy Golden Answer")
    
    answer.helpful_count += 1
    await db.flush()
    
    return {"message": "Đã đánh dấu hữu ích", "helpful_count": answer.helpful_count}
