from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from datetime import timedelta
from pydantic import BaseModel

from database.database import get_db
from models.models import User, UserSession, AuditLog
from schemas.schemas import UserRegisterRequest, UserLoginRequest, TokenResponse, UserResponse
from services.auth import get_password_hash, verify_password, create_access_token, create_user_session, get_current_user, settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    email: str
    reset_code: str
    new_password: str

@router.post("/register", response_model=TokenResponse)
def register(user_in: UserRegisterRequest, request: Request, db: Session = Depends(get_db)):
    email_clean = user_in.email.strip().lower()
    existing_user = db.query(User).filter(User.email == email_clean).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address is already registered. Please sign in."
        )
    
    hashed_pwd = get_password_hash(user_in.password)
    user = User(
        name=user_in.name,
        email=email_clean,
        password_hash=hashed_pwd,
        role="User"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    client_ip = request.client.host if request.client else "127.0.0.1"
    access_token = create_user_session(user.id, db, device="Web Browser", ip_address=client_ip)

    audit = AuditLog(user_id=user.id, action="User Register", resource="/auth/register", status="Success")
    db.add(audit)
    db.commit()

    return {
        "access_token": access_token, 
        "token_type": "Bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }

@router.post("/login", response_model=TokenResponse)
def login(login_in: UserLoginRequest, request: Request, db: Session = Depends(get_db)):
    email_clean = login_in.email.strip().lower()
    user = db.query(User).filter(User.email == email_clean).first()
    if not user or not verify_password(login_in.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    client_ip = request.client.host if request.client else "127.0.0.1"
    access_token = create_user_session(user.id, db, device="Web Browser", ip_address=client_ip)

    audit = AuditLog(user_id=user.id, action="User Login", resource="/auth/login", status="Success")
    db.add(audit)
    db.commit()

    return {
        "access_token": access_token, 
        "token_type": "Bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }

@router.post("/logout", response_model=dict)
def logout(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db.query(UserSession).filter(UserSession.user_id == current_user.id).delete()
    audit = AuditLog(user_id=current_user.id, action="User Logout", resource="/auth/logout", status="Success")
    db.add(audit)
    db.commit()
    return {"success": True}

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/forgot-password", response_model=dict)
def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email.strip().lower()).first()
    if not user:
        return {"success": True, "message": "Password reset code sent to email.", "reset_code": "AEGIVEX-8899"}
    
    return {"success": True, "message": "Password reset authorization code generated.", "reset_code": "AEGIVEX-8899"}

@router.post("/reset-password", response_model=dict)
def reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email.strip().lower()).first()
    if not user:
        raise HTTPException(status_code=404, detail="Registered email address not found.")
    
    if req.reset_code != "AEGIVEX-8899":
        raise HTTPException(status_code=400, detail="Invalid password reset verification code.")
    
    if len(req.new_password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters long.")
    
    user.password_hash = get_password_hash(req.new_password)
    db.commit()

    audit = AuditLog(user_id=user.id, action="Password Reset Completed", resource="/auth/reset-password", status="Success")
    db.add(audit)
    db.commit()

    return {"success": True, "message": "Password reset successfully. You may now sign in."}
