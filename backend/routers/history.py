from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from models.models import User, ScanHistory
from schemas.schemas import ScanHistoryItem
from services.auth import get_current_user

router = APIRouter(prefix="/history", tags=["Scan History"])

@router.get("", response_model=List[ScanHistoryItem])
def get_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    scans = (
        db.query(ScanHistory)
        .filter(ScanHistory.user_id == current_user.id)
        .order_by(ScanHistory.created_at.desc())
        .limit(100)
        .all()
    )
    return scans

@router.delete("/{history_id}")
def delete_history(history_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    record = db.query(ScanHistory).filter(ScanHistory.id == history_id, ScanHistory.user_id == current_user.id).first()
    if not record:
        return {"success": False, "message": "History item not found."}
    
    db.delete(record)
    db.commit()
    return {"success": True, "message": "Scan history item removed successfully."}

