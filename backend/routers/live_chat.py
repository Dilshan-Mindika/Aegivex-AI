from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.database import get_db
from models.models import User, LiveChatMessage
from schemas.schemas import LiveChatMessageCreate, LiveChatMessageResponse
from services.auth import get_current_user

router = APIRouter(prefix="/chat/live", tags=["Live Support Chat"])

@router.post("/send", response_model=LiveChatMessageResponse)
def send_live_message(
    msg_in: LiveChatMessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not msg_in.message.trim() if hasattr(msg_in.message, 'trim') else not msg_in.message.strip():
        raise HTTPException(status_code=400, detail="Message content cannot be empty.")

    # Determine user_id to attach to message
    target_user_id = current_user.id
    is_admin = current_user.role.lower() == "admin"

    if is_admin and msg_in.user_id:
        target_user_id = msg_in.user_id

    chat_msg = LiveChatMessage(
        user_id=target_user_id,
        sender_name=current_user.name,
        sender_role=current_user.role,
        message=msg_in.message.strip(),
        is_admin_reply=is_admin
    )
    db.add(chat_msg)
    db.commit()
    db.refresh(chat_msg)

    return chat_msg


@router.get("/messages", response_model=List[LiveChatMessageResponse])
def get_live_messages(
    user_id: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    target_user_id = current_user.id
    if current_user.role.lower() == "admin" and user_id:
        target_user_id = user_id

    messages = (
        db.query(LiveChatMessage)
        .filter(LiveChatMessage.user_id == target_user_id)
        .order_by(LiveChatMessage.created_at.asc())
        .all()
    )
    return messages


@router.get("/admin/conversations", response_model=dict)
def get_admin_chat_conversations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role.lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin access required.")

    # Group messages by user
    all_users = db.query(User).all()
    conversations = []

    for user in all_users:
        user_msgs = (
            db.query(LiveChatMessage)
            .filter(LiveChatMessage.user_id == user.id)
            .order_by(LiveChatMessage.created_at.desc())
            .all()
        )
        if user_msgs:
            conversations.append({
                "user_id": user.id,
                "user_name": user.name,
                "user_email": user.email,
                "user_role": user.role,
                "unread_count": len([m for m in user_msgs if not m.is_admin_reply]),
                "last_message": user_msgs[0].message,
                "last_timestamp": user_msgs[0].created_at.isoformat(),
                "total_messages": len(user_msgs)
            })

    return {"conversations": conversations}
