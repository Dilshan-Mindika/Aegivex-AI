from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.database import get_db
from models.models import (
    User, WalletScan, TokenScan, ContractScan, WebsiteScan, TransactionScan, ScanHistory, Notification
)
from schemas.schemas import (
    WalletScanRequest, WalletScanResponse,
    TokenScanRequest, TokenScanResponse,
    ContractScanRequest, ContractScanResponse,
    WebsiteScanRequest, WebsiteScanResponse,
    TransactionScanRequest, TransactionScanResponse
)
from services.auth import get_current_user
from services.ai_engine import AISecurityEngine

router = APIRouter(prefix="/scan", tags=["Scanners"])

# Wallet Scanner
@router.post("/wallet", response_model=WalletScanResponse)
def scan_wallet(req: WalletScanRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = AISecurityEngine.analyze_wallet(req.wallet_address)

    scan = WalletScan(
        user_id=current_user.id,
        wallet_address=req.wallet_address,
        risk_score=result["risk_score"],
        risk_level=result["risk_level"],
        summary=result["summary"],
        recommendation=result["recommendation"]
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    # Index in ScanHistory
    history = ScanHistory(
        user_id=current_user.id,
        scan_type="wallet",
        reference_id=scan.id,
        risk_score=scan.risk_score,
        risk_level=scan.risk_level,
        target=scan.wallet_address
    )
    db.add(history)

    if scan.risk_level == "High":
        noti = Notification(
            user_id=current_user.id,
            title="High Risk Wallet Detected",
            message=f"Wallet address {scan.wallet_address[:10]}... was flagged with high risk score ({scan.risk_score}).",
            type="Critical"
        )
        db.add(noti)

    db.commit()
    return scan


# Token Scanner
@router.post("/token", response_model=TokenScanResponse)
def scan_token(req: TokenScanRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = AISecurityEngine.analyze_token(req.contract_address)

    scan = TokenScan(
        user_id=current_user.id,
        contract_address=req.contract_address,
        token_name=result["token_name"],
        symbol=result["symbol"],
        risk_score=result["risk_score"],
        risk_level=result["risk_level"],
        liquidity=result["liquidity"],
        honeypot=result["honeypot"],
        recommendation=result["recommendation"]
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    history = ScanHistory(
        user_id=current_user.id,
        scan_type="token",
        reference_id=scan.id,
        risk_score=scan.risk_score,
        risk_level=scan.risk_level,
        target=f"{scan.symbol} ({scan.contract_address[:8]}...)"
    )
    db.add(history)

    if scan.honeypot or scan.risk_level == "High":
        noti = Notification(
            user_id=current_user.id,
            title="Honeypot / High Risk Token Flagged",
            message=f"Token {scan.symbol} was identified as honeypot risk ({scan.risk_score}/100).",
            type="Critical"
        )
        db.add(noti)

    db.commit()
    return scan


# Smart Contract Scanner
@router.post("/contract", response_model=ContractScanResponse)
def scan_contract(req: ContractScanRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = AISecurityEngine.analyze_contract(req.contract_address)

    scan = ContractScan(
        user_id=current_user.id,
        contract_address=req.contract_address,
        verified=result["verified"],
        proxy_contract=result["proxy_contract"],
        risk_score=result["risk_score"],
        risk_level=result["risk_level"],
        recommendation=result["recommendation"]
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    history = ScanHistory(
        user_id=current_user.id,
        scan_type="contract",
        reference_id=scan.id,
        risk_score=scan.risk_score,
        risk_level=scan.risk_level,
        target=scan.contract_address
    )
    db.add(history)
    db.commit()
    return scan


# Website Scanner
@router.post("/website", response_model=WebsiteScanResponse)
def scan_website(req: WebsiteScanRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = AISecurityEngine.analyze_website(req.url)

    scan = WebsiteScan(
        user_id=current_user.id,
        website_url=req.url,
        trust_score=result["trust_score"],
        ssl_status=result["ssl_status"],
        domain_age=result["domain_age"],
        risk_level=result["risk_level"],
        recommendation=result["recommendation"]
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    history = ScanHistory(
        user_id=current_user.id,
        scan_type="website",
        reference_id=scan.id,
        risk_score=100 - scan.trust_score,
        risk_level=scan.risk_level,
        target=scan.website_url
    )
    db.add(history)

    if scan.risk_level == "High":
        noti = Notification(
            user_id=current_user.id,
            title="Phishing Website Detected",
            message=f"Website {scan.website_url} was flagged as a potential Web3 wallet drainer.",
            type="Critical"
        )
        db.add(noti)

    db.commit()
    return scan


# Transaction Explainer
@router.post("/transaction", response_model=TransactionScanResponse)
def scan_transaction(req: TransactionScanRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = AISecurityEngine.analyze_transaction(req.transaction_hash)

    scan = TransactionScan(
        user_id=current_user.id,
        transaction_hash=req.transaction_hash,
        network=result["network"],
        risk_score=result["risk_score"],
        risk_level=result["risk_level"],
        summary=result["summary"],
        recommendation=result["recommendation"]
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    history = ScanHistory(
        user_id=current_user.id,
        scan_type="transaction",
        reference_id=scan.id,
        risk_score=scan.risk_score,
        risk_level=scan.risk_level,
        target=scan.transaction_hash
    )
    db.add(history)

    if scan.risk_level == "High":
        noti = Notification(
            user_id=current_user.id,
            title="High Risk Approval Transaction",
            message="A recent scan detected an unlimited token spending approval request.",
            type="Warning"
        )
        db.add(noti)

    db.commit()
    return scan
