from datetime import datetime, timedelta
from typing import Optional
import hashlib
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from config import settings
from database.database import get_db
from models.models import User, UserSession

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login", auto_error=True)

def get_password_hash(password: str) -> str:
    """Generates a secure salted SHA256 password hash."""
    return hashlib.sha256(f"aegivex_salt_2026_{password}".encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies plain password against stored password hash."""
    if not hashed_password or not plain_password:
        return False
    return get_password_hash(plain_password) == hashed_password

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def create_user_session(user_id: str, db: Session, device: str = "Web Browser", ip_address: Optional[str] = None) -> str:
    """Creates an authenticated database UserSession and returns a signed JWT access token."""
    access_token = create_access_token(data={"sub": user_id})
    expires_at = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    session = UserSession(
        user_id=user_id,
        jwt_token=access_token,
        device=device,
        ip_address=ip_address,
        expires_at=expires_at
    )
    db.add(session)
    db.commit()
    return access_token

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    """
    Strictly authenticates incoming HTTP requests.
    Validates JWT token against database UserSession table and returns User object.
    Raises 401 Unauthorized if unauthenticated or session expired.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials or session expired. Please sign in.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not token:
        raise credentials_exception

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if not user_id:
            raise credentials_exception
    except Exception:
        raise credentials_exception

    # Check user in database
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise credentials_exception

    return user
