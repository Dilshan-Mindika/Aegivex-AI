import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    profile_image = Column(String, nullable=True, default="avatar.png")
    role = Column(String, default="User")
    status = Column(String, default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    sessions = relationship("UserSession", back_populates="user", cascade="all, delete-orphan")
    conversations = relationship("AIConversation", back_populates="user", cascade="all, delete-orphan")
    wallet_scans = relationship("WalletScan", back_populates="user", cascade="all, delete-orphan")
    token_scans = relationship("TokenScan", back_populates="user", cascade="all, delete-orphan")
    contract_scans = relationship("ContractScan", back_populates="user", cascade="all, delete-orphan")
    website_scans = relationship("WebsiteScan", back_populates="user", cascade="all, delete-orphan")
    transaction_scans = relationship("TransactionScan", back_populates="user", cascade="all, delete-orphan")
    scan_history = relationship("ScanHistory", back_populates="user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user", cascade="all, delete-orphan")
    live_messages = relationship("LiveChatMessage", back_populates="user", cascade="all, delete-orphan")


class UserSession(Base):
    __tablename__ = "user_sessions"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    jwt_token = Column(Text, nullable=False)
    device = Column(String, nullable=True)
    ip_address = Column(String, nullable=True)
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="sessions")


class AIConversation(Base):
    __tablename__ = "ai_conversations"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    prompt = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    tokens_used = Column(Integer, default=0)
    model = Column(String, default="Aegivex-SecCopilot-v1")
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user = relationship("User", back_populates="conversations")


class WalletScan(Base):
    __tablename__ = "wallet_scans"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    wallet_address = Column(String, nullable=False, index=True)
    risk_score = Column(Integer, nullable=False)
    risk_level = Column(String, nullable=False)  # Low, Medium, High
    summary = Column(Text, nullable=False)
    recommendation = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user = relationship("User", back_populates="wallet_scans")


class TokenScan(Base):
    __tablename__ = "token_scans"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    contract_address = Column(String, nullable=False, index=True)
    token_name = Column(String, nullable=False)
    symbol = Column(String, nullable=False)
    risk_score = Column(Integer, nullable=False)
    risk_level = Column(String, nullable=False)
    liquidity = Column(String, nullable=True)
    honeypot = Column(Boolean, default=False)
    recommendation = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user = relationship("User", back_populates="token_scans")


class ContractScan(Base):
    __tablename__ = "contract_scans"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    contract_address = Column(String, nullable=False, index=True)
    verified = Column(Boolean, default=True)
    proxy_contract = Column(Boolean, default=False)
    risk_score = Column(Integer, nullable=False)
    risk_level = Column(String, nullable=False)
    recommendation = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user = relationship("User", back_populates="contract_scans")


class WebsiteScan(Base):
    __tablename__ = "website_scans"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    website_url = Column(String, nullable=False, index=True)
    ssl_status = Column(String, default="Valid")
    domain_age = Column(String, default="2 years")
    trust_score = Column(Integer, nullable=False)
    risk_level = Column(String, nullable=False)
    recommendation = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user = relationship("User", back_populates="website_scans")


class TransactionScan(Base):
    __tablename__ = "transaction_scans"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    transaction_hash = Column(String, nullable=False, index=True)
    network = Column(String, default="Ethereum Mainnet")
    risk_score = Column(Integer, nullable=False)
    risk_level = Column(String, nullable=False)
    summary = Column(Text, nullable=False)
    recommendation = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user = relationship("User", back_populates="transaction_scans")


class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    scan_type = Column(String, nullable=False)  # wallet, token, contract, website, transaction
    reference_id = Column(String, nullable=False)
    risk_score = Column(Integer, nullable=False)
    risk_level = Column(String, nullable=False)
    target = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user = relationship("User", back_populates="scan_history")


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String, default="Warning")  # Warning, Info, Critical
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user = relationship("User", back_populates="notifications")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=True, index=True)
    action = Column(String, nullable=False)
    resource = Column(String, nullable=False)
    status = Column(String, default="Success")
    ip_address = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user = relationship("User", back_populates="audit_logs")


class LiveChatMessage(Base):
    __tablename__ = "live_chat_messages"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    sender_name = Column(String, nullable=False)
    sender_role = Column(String, default="User")  # "User" or "Admin"
    message = Column(Text, nullable=False)
    is_admin_reply = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user = relationship("User", back_populates="live_messages")

