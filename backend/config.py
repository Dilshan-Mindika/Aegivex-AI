import os
from urllib.parse import quote_plus
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Aegivex AI - Web3 Security Copilot"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me-in-production-aegivex-secret-key-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Database connection parameters (separated for easy deployment)
    DB_ENGINE: str = os.getenv("DB_ENGINE", "postgresql")
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_PORT: str = os.getenv("DB_PORT", "5432")
    DB_NAME: str = os.getenv("DB_NAME", "aegivex_db")
    DB_USER: str = os.getenv("DB_USER", "postgres")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", "")

    DATABASE_URL: str = ""

    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    OPENROUTER_API_KEY: str = os.getenv("OPENROUTER_API_KEY", "")
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "auto")
    ETHERSCAN_API_KEY: str = os.getenv("ETHERSCAN_API_KEY", "MV5HHIUSX25KSCAXPIXZAG6X6E9X6BP7Y9")



    def __init__(self, **values):
        super().__init__(**values)
        if not self.DATABASE_URL:
            raw_url = os.getenv("DATABASE_URL")
            if raw_url:
                self.DATABASE_URL = raw_url
            elif self.DB_ENGINE.lower() in ["postgres", "postgresql"]:
                encoded_password = quote_plus(self.DB_PASSWORD) if self.DB_PASSWORD else ""
                user_pass = f"{self.DB_USER}:{encoded_password}@" if self.DB_USER else ""
                self.DATABASE_URL = f"postgresql://{user_pass}{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
            else:
                self.DATABASE_URL = "sqlite:///./aegivex.db"

    class Config:
        case_sensitive = True

settings = Settings()
