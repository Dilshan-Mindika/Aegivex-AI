from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.database import get_db
from models.models import User, Notification
from schemas.schemas import NotificationResponse
from services.auth import get_current_user

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("", response_model=List[NotificationResponse])
def get_notifications(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    notifications = (
        db.query(Notification)
        .filter(Notification.user_id == current_user.id)
        .order_by(Notification.created_at.desc())
        .limit(20)
        .all()
    )
    return notifications

@router.post("/read-all", response_model=dict)
def mark_all_notifications_as_read(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.is_read == False
    ).update({"is_read": True}, synchronize_session=False)
    db.commit()
    return {"success": True, "message": "All notifications marked as read."}

@router.post("/{notification_id}/read", response_model=dict)
def mark_single_notification_as_read(
    notification_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    noti = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == current_user.id
    ).first()
    if not noti:
        raise HTTPException(status_code=404, detail="Notification not found.")
    
    noti.is_read = True
    db.commit()
    return {"success": True, "message": "Notification marked as read."}

@router.post("/webhook", response_model=dict)
def incoming_webhook(payload: dict):
    """
    Real-Time Security Threat Alert & Telemetry Webhook Endpoint
    Receives automated security telemetry, drainer alerts, and transaction audit webhooks.
    """
    return {
        "status": "received",
        "processed": True,
        "payload": payload,
        "message": "Aegivex AI Threat Telemetry Webhook processed successfully."
    }
