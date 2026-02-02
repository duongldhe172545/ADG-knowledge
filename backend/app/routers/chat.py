"""Chat API router - Integration with NotebookLM."""
from uuid import uuid4

from fastapi import APIRouter

from app.schemas import ChatRequest, ChatResponse, Citation

router = APIRouter()


@router.post("/query", response_model=ChatResponse)
async def chat_query(request: ChatRequest):
    """
    Gửi câu hỏi đến NotebookLM và nhận câu trả lời.
    
    TODO: Integrate with NotebookLM MCP server
    """
    # Mock response for now
    # In production, this will call NotebookLM via MCP
    
    conversation_id = request.conversation_id or str(uuid4())
    
    return ChatResponse(
        answer=f"Đây là câu trả lời mẫu cho: '{request.query}'. "
               "Trong phiên bản hoàn chỉnh, câu trả lời sẽ được tạo bởi NotebookLM AI.",
        citations=[
            Citation(
                source_id="mock-source-1",
                source_title="Báo cáo Marketing Q3.pdf",
                text="Đây là trích dẫn mẫu từ tài liệu nguồn.",
                page=15,
            )
        ],
        conversation_id=conversation_id,
        suggested_queries=[
            "Tóm tắt chiến lược B2B",
            "Liệt kê đối thủ chính",
            "Xu hướng thị trường Q4",
        ],
    )


@router.get("/history/{conversation_id}")
async def get_chat_history(conversation_id: str):
    """
    Lấy lịch sử chat theo conversation ID.
    
    TODO: Implement chat history storage
    """
    return {
        "conversation_id": conversation_id,
        "messages": [],
        "message": "Chat history chưa được triển khai",
    }
