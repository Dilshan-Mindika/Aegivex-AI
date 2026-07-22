from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from datetime import timedelta

from database.database import get_db
from models.models import User, UserSession, AuditLog
from schemas.schemas import UserRegisterRequest, UserLoginRequest, TokenResponse, UserResponse
from services.auth import get_password_hash, verify_password, create_access_token, create_user_session, get_current_user, settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
def register(user_in: UserRegisterRequest, request: Request, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address is already registered. Please sign in."
        )
    
    hashed_pwd = get_password_hash(user_in.password)
    user = User(
        name=user_in.name,
        email=user_in.email,
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

    return {"access_token": access_token, "token_type": "Bearer"}

@router.post("/login", response_model=TokenResponse)
def login(login_in: UserLoginRequest, request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_in.email).first()
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

    return {"access_token": access_token, "token_type": "Bearer"}

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
