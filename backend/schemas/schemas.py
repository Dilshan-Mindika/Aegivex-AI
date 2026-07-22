from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field

# Auth Schemas
class UserRegisterRequest(BaseModel):
    name: str = Field(..., example="John Doe")
    email: str = Field(..., example="john@example.com")
    password: str = Field(..., example="StrongPassword123")
    account_type: Optional[str] = Field("Researcher", example="Researcher")
    organization: Optional[str] = Field(None, example="Aegivex Labs")
    primary_chain: Optional[str] = Field("OKX X Layer", example="OKX X Layer")


class UserLoginRequest(BaseModel):
    email: str = Field(..., example="john@example.com")
    password: str = Field(..., example="StrongPassword123")

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "Bearer"

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    profile_image: Optional[str] = "avatar.png"
    role: str = "User"
    created_at: datetime

    class Config:
        from_attributes = True

# Profile Update
class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = None
    profile_image: Optional[str] = None

# Scanner Request/Response Schemas
class WalletScanRequest(BaseModel):
    wallet_address: str = Field(..., example="0x71C7656EC7ab88b098defB751B7401B5f6d8976F")

class WalletScanResponse(BaseModel):
    id: str
    wallet_address: str
    risk_score: int
    risk_level: str
    summary: str
    recommendation: str
    created_at: datetime

    class Config:
        from_attributes = True

class TokenScanRequest(BaseModel):
    contract_address: str = Field(..., example="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984")

class TokenScanResponse(BaseModel):
    id: str
    contract_address: str
    token_name: str
    symbol: str
    risk_score: int
    risk_level: str
    liquidity: str
    honeypot: bool
    recommendation: str
    created_at: datetime

    class Config:
        from_attributes = True

class ContractScanRequest(BaseModel):
    contract_address: str = Field(..., example="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")

class ContractScanResponse(BaseModel):
    id: str
    contract_address: str
    verified: bool
    proxy_contract: bool
    risk_score: int
    risk_level: str
    recommendation: str
    created_at: datetime

    class Config:
        from_attributes = True

class WebsiteScanRequest(BaseModel):
    url: str = Field(..., example="https://uniswap.org")

class WebsiteScanResponse(BaseModel):
    id: str
    website_url: str
    trust_score: int
    ssl_status: str
    domain_age: str
    risk_level: str
    recommendation: str
    created_at: datetime

    class Config:
        from_attributes = True

class TransactionScanRequest(BaseModel):
    transaction_hash: str = Field(..., example="0x9876543210abcdef9876543210abcdef9876543210abcdef9876543210abcdef")

class TransactionScanResponse(BaseModel):
    id: str
    transaction_hash: str
    network: str
    summary: str
    risk_score: int
    risk_level: str
    recommendation: str
    created_at: datetime

    class Config:
        from_attributes = True

# AI Chat Schemas
class AIChatRequest(BaseModel):
    prompt: str = Field(..., example="Is this wallet address safe?")

class AIChatResponse(BaseModel):
    id: str
    prompt: str
    response: str
    risk_score: Optional[int] = 15
    confidence: Optional[int] = 95
    model: str = "Aegivex-SecCopilot-v1"
    created_at: datetime

    class Config:
        from_attributes = True

# History Item
class ScanHistoryItem(BaseModel):
    id: str
    scan_type: str
    target: str
    risk_score: int
    risk_level: str
    created_at: datetime

    class Config:
        from_attributes = True

# Dashboard Stats
class DashboardStatsResponse(BaseModel):
    total_scans: int
    wallet_scans: int
    token_scans: int
    contract_scans: int
    website_scans: int
    transaction_scans: int
    average_risk_score: int
    ai_security_score: int
    active_threats_count: int

# Notifications
class NotificationResponse(BaseModel):
    id: str
    title: str
    message: str
    type: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Live Support Chat Schemas
class LiveChatMessageCreate(BaseModel):
    message: str
    user_id: Optional[str] = None  # If admin is sending message to a specific user

class LiveChatMessageResponse(BaseModel):
    id: str
    user_id: str
    sender_name: str
    sender_role: str
    message: str
    is_admin_reply: bool
    created_at: datetime

    class Config:
        from_attributes = True

