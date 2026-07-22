from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from database.database import get_db
from models.models import (
    User, WalletScan, TokenScan, ContractScan, WebsiteScan, TransactionScan, ScanHistory, Notification
)
from schemas.schemas import DashboardStatsResponse
from services.auth import get_current_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("", response_model=DashboardStatsResponse)
def get_dashboard_stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    w_count = db.query(WalletScan).filter(WalletScan.user_id == current_user.id).count()
    t_count = db.query(TokenScan).filter(TokenScan.user_id == current_user.id).count()
    c_count = db.query(ContractScan).filter(ContractScan.user_id == current_user.id).count()
    web_count = db.query(WebsiteScan).filter(WebsiteScan.user_id == current_user.id).count()
    tx_count = db.query(TransactionScan).filter(TransactionScan.user_id == current_user.id).count()

    total = w_count + t_count + c_count + web_count + tx_count

    avg_score_query = db.query(func.avg(ScanHistory.risk_score)).filter(ScanHistory.user_id == current_user.id).scalar()
    avg_score = int(avg_score_query) if avg_score_query is not None else 18

    # AI overall safety score formula
    ai_security_score = max(0, 100 - avg_score)

    active_threats = db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.type == "Critical",
        Notification.is_read == False
    ).count()

    return {
        "total_scans": total,
        "wallet_scans": w_count,
        "token_scans": t_count,
        "contract_scans": c_count,
        "website_scans": web_count,
        "transaction_scans": tx_count,
        "average_risk_score": avg_score,
        "ai_security_score": ai_security_score,
        "active_threats_count": active_threats
    }
