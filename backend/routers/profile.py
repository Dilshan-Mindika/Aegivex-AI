from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database.database import get_db
from models.models import User, AuditLog
from schemas.schemas import UserResponse, ProfileUpdateRequest
from services.auth import get_current_user, verify_password, get_password_hash

router = APIRouter(prefix="/profile", tags=["User Profile"])

class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str

@router.get("", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("", response_model=dict)
def update_profile(req: ProfileUpdateRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if req.name:
        current_user.name = req.name
    if req.profile_image:
        current_user.profile_image = req.profile_image
    
    db.commit()
    return {"success": True, "message": "Profile updated successfully."}

@router.post("/change-password", response_model=dict)
def change_password(
    req: PasswordChangeRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not verify_password(req.current_password, current_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect."
        )
    
    if len(req.new_password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must be at least 6 characters long."
        )

    current_user.password_hash = get_password_hash(req.new_password)
    db.commit()

    # Log audit event
    audit = AuditLog(
        user_id=current_user.id,
        action="Password Changed in Settings",
        resource="/profile/change-password",
        status="Success"
    )
    db.add(audit)
    db.commit()

    return {"success": True, "message": "Security password updated successfully."}
