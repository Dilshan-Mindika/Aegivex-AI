from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database.database import get_db
from models.models import User, WalletScan, TokenScan, ContractScan, WebsiteScan, TransactionScan, AuditLog, ScanHistory
from services.auth import get_current_user

router = APIRouter(prefix="/admin", tags=["Admin Management"])

class RoleUpdateRequest(BaseModel):
    role: str # "User" or "Admin"

@router.get("/stats", response_model=dict)
def get_admin_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role.lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin access privilege required.")

    total_users = db.query(User).count()
    admin_users = db.query(User).filter(User.role == "Admin").count()
    regular_users = total_users - admin_users

    w_scans = db.query(WalletScan).count()
    t_scans = db.query(TokenScan).count()
    c_scans = db.query(ContractScan).count()
    web_scans = db.query(WebsiteScan).count()
    tx_scans = db.query(TransactionScan).count()
    total_global_scans = w_scans + t_scans + c_scans + web_scans + tx_scans

    active_threats = (
        db.query(ScanHistory)
        .filter(ScanHistory.risk_level.in_(["High", "Critical"]))
        .count()
    )

    audit_logs_count = db.query(AuditLog).count()

    return {
        "total_users": total_users,
        "admin_count": admin_users,
        "regular_user_count": regular_users,
        "total_global_scans": total_global_scans,
        "active_threats_blocked": active_threats,
        "audit_logs_recorded": audit_logs_count,
        "system_status": "OPERATIONAL",
        "neural_engine_health": "99.98%"
    }


@router.get("/users", response_model=dict)
def get_all_users(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role.lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin access privilege required.")

    users = db.query(User).all()
    user_list = []

    for u in users:
        user_scans_count = db.query(ScanHistory).filter(ScanHistory.user_id == u.id).count()
        user_list.append({
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "status": u.status,
            "scans_count": user_scans_count,
            "created_at": u.created_at.isoformat()
        })

    return {"users": user_list}


@router.post("/users/{user_id}/role", response_model=dict)
def update_user_role(
    user_id: str,
    req: RoleUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role.lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin access privilege required.")

    target_user = db.query(User).filter(User.id == user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found.")

    target_user.role = req.role.capitalize()
    db.commit()

    # Log audit event
    audit = AuditLog(
        user_id=current_user.id,
        action=f"Changed Role of User {target_user.email} to {req.role}",
        resource=f"/admin/users/{user_id}/role",
        status="Success"
    )
    db.add(audit)
    db.commit()

    return {"success": True, "message": f"Role updated to {target_user.role}"}


@router.get("/audit-logs", response_model=dict)
def get_audit_logs(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role.lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin access privilege required.")

    logs = db.query(AuditLog).order_by(AuditLog.created_at.desc()).limit(50).all()
    log_list = []

    for l in logs:
        log_list.append({
            "id": l.id,
            "user_id": l.user_id,
            "action": l.action,
            "resource": l.resource,
            "status": l.status,
            "created_at": l.created_at.isoformat()
        })

    return {"audit_logs": log_list}
