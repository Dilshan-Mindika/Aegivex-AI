from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from database.database import get_db
from models.models import User, UserSession, AuditLog
from schemas.schemas import UserRegisterRequest, UserLoginRequest, TokenResponse, UserResponse
from services.auth import get_password_hash, verify_password, create_access_token, get_current_user, settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=dict)
def register(user_in: UserRegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered"
        )
    
    hashed_pwd = get_password_hash(user_in.password)
    user = User(
        name=user_in.name,
        email=user_in.email,
        password_hash=hashed_pwd
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Log audit event
    audit = AuditLog(user_id=user.id, action="User Register", resource="/auth/register", status="Success")
    db.add(audit)
    db.commit()

    return {"success": True, "message": "User registered successfully."}

@router.post("/login", response_model=TokenResponse)
def login(login_in: UserLoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_in.email).first()
    if not user or not verify_password(login_in.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.id})

    # Record user session
    session = UserSession(
        user_id=user.id,
        jwt_token=access_token,
        device="Web Browser",
        expires_at=UserSession.created_at + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    db.add(session)

    # Log audit event
    audit = AuditLog(user_id=user.id, action="User Login", resource="/auth/login", status="Success")
    db.add(audit)
    db.commit()

    return {"access_token": access_token, "token_type": "Bearer"}

@router.post("/logout", response_model=dict)
def logout(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Delete active sessions for user
    db.query(UserSession).filter(UserSession.user_id == current_user.id).delete()
    
    audit = AuditLog(user_id=current_user.id, action="User Logout", resource="/auth/logout", status="Success")
    db.add(audit)
    db.commit()
    return {"success": True}

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
