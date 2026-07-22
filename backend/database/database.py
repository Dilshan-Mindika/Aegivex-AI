from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
from config import settings

def init_engine():
    db_url = settings.DATABASE_URL
    connect_args = {"check_same_thread": False} if db_url.startswith("sqlite") else {}

    try:
        engine = create_engine(db_url, connect_args=connect_args)
        # Test connection
        with engine.connect() as conn:
            pass
        return engine
    except Exception as e:
        print(f"[Aegivex Database Warning] Could not connect to primary database '{db_url}'. Falling back to local SQLite engine. Details: {e}")
        fallback_url = "sqlite:///./aegivex.db"
        return create_engine(fallback_url, connect_args={"check_same_thread": False})

engine = init_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
