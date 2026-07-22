from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from models.models import User, AIConversation
from schemas.schemas import AIChatRequest, AIChatResponse
from services.auth import get_current_user
from services.ai_engine import AISecurityEngine

router = APIRouter(prefix="/ai", tags=["AI Copilot"])

@router.post("/chat", response_model=AIChatResponse)
def chat(request: AIChatRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ai_res, risk_score, confidence = AISecurityEngine.chat_copilot(request.prompt)

    conversation = AIConversation(
        user_id=current_user.id,
        prompt=request.prompt,
        response=ai_res,
        tokens_used=len(request.prompt.split()) + len(ai_res.split()),
        model="Aegivex-SecCopilot-v1"
    )
    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return {
        "id": conversation.id,
        "prompt": conversation.prompt,
        "response": conversation.response,
        "risk_score": risk_score,
        "confidence": confidence,
        "model": conversation.model,
        "created_at": conversation.created_at
    }
