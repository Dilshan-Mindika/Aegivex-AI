from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.database import get_db
from models.models import User
from schemas.schemas import UserResponse, ProfileUpdateRequest
from services.auth import get_current_user

router = APIRouter(prefix="/profile", tags=["User Profile"])

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
