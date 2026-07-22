import sys
import os
from datetime import datetime, timedelta

# Ensure backend directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database.database import SessionLocal, engine, Base
from models.models import User, WalletScan, TokenScan, ContractScan, WebsiteScan, TransactionScan, ScanHistory, AuditLog, Notification
from services.auth import get_password_hash

def seed_database():
    print("=== AEGIVEX AI DATABASE SEEDING PROCESS ===")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Create or Update Admin User
        admin = db.query(User).filter(User.email == "admin@aegivex.ai").first()
        if not admin:
            admin = User(
                name="System Administrator",
                email="admin@aegivex.ai",
                password_hash=get_password_hash("AdminPassword123!"),
                role="Admin",
                status="Active"
            )
            db.add(admin)
            db.commit()
            db.refresh(admin)
            print("[OK] Admin User created: admin@aegivex.ai / AdminPassword123!")
        else:
            admin.password_hash = get_password_hash("AdminPassword123!")
            admin.role = "Admin"
            db.commit()
            print("[OK] Admin User updated: admin@aegivex.ai / AdminPassword123!")

        # 2. Create or Update Regular User
        user = db.query(User).filter(User.email == "user@aegivex.ai").first()
        if not user:
            user = User(
                name="Security Researcher",
                email="user@aegivex.ai",
                password_hash=get_password_hash("UserPassword123!"),
                role="User",
                status="Active"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            print("[OK] Regular User created: user@aegivex.ai / UserPassword123!")
        else:
            user.password_hash = get_password_hash("UserPassword123!")
            user.role = "User"
            db.commit()
            print("[OK] Regular User updated: user@aegivex.ai / UserPassword123!")

        # 3. Seed Sample Security Telemetry & Scans if empty
        if db.query(ScanHistory).count() == 0:
            sample_scans = [
                ScanHistory(user_id=user.id, scan_type="Wallet", reference_id="ref_01", target="0x71C7656EC7ab88b098defB751B7401B5f6d8976F", risk_score=12, risk_level="Low"),
                ScanHistory(user_id=user.id, scan_type="Token", reference_id="ref_02", target="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", risk_score=92, risk_level="High"),
                ScanHistory(user_id=user.id, scan_type="Website", reference_id="ref_03", target="https://uniswap.org", risk_score=5, risk_level="Low"),
                ScanHistory(user_id=admin.id, scan_type="Contract", reference_id="ref_04", target="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", risk_score=25, risk_level="Low"),
            ]
            db.add_all(sample_scans)
            db.commit()
            print("[OK] Sample Scan Telemetry seeded into database.")

        # 4. Seed Audit Logs
        if db.query(AuditLog).count() == 0:
            sample_audits = [
                AuditLog(user_id=admin.id, action="System Initialization", resource="/admin/init", status="Success"),
                AuditLog(user_id=admin.id, action="Admin Login", resource="/auth/login", status="Success"),
                AuditLog(user_id=user.id, action="User Register", resource="/auth/register", status="Success"),
            ]
            db.add_all(sample_audits)
            db.commit()
            print("[OK] Audit Logs seeded into database.")

        print("\nDATABASE SEEDING COMPLETE SUCCESSFUL!")

    except Exception as e:
        print(f"Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
