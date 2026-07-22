# Aegivex AI - AI-Powered Web3 Security Copilot 🛡️✨

[![OKX.AI Genesis Hackathon](https://img.shields.io/badge/Hackathon-OKX.AI%20Genesis-blue.svg)](https://okx.com)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-000000.svg)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20Python-009688.svg)](https://fastapi.tiangolo.com)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20SQLAlchemy-336791.svg)](https://postgresql.org)

**Tagline**: *Your AI Security Copilot for Web3*  
**Official Project Specifications & Assets**: [`docs/`](./docs) ([`docs/logo.png`](./docs/logo.png))

---

## 🌟 Executive Summary

**Aegivex AI** is an AI-powered Web3 Security Copilot designed for the **OKX.AI Genesis Hackathon**. It empowers crypto beginners, traders, investors, and Web3 developers to evaluate security risks before interacting with wallet addresses, token smart contracts, dApp websites, or blockchain transaction permits.

By combining real-time blockchain heuristic auditing with artificial intelligence reasoning, Aegivex AI translates complex smart contract bytecodes and permit approvals into plain-language explanations with actionable security guidance.

---

## 🚀 Key Features & Scanners

1. 🤖 **AI Security Chat Copilot**: Interactive natural language assistant for querying smart contract vulnerabilities, wallet drainers, and scam prevention strategies.
2. 👛 **Wallet Risk & Drainer Scanner**: Evaluates EVM and Solana wallet addresses for historical drainer contract interactions and phishing flags.
3. 🪙 **Token Risk Analyzer**: Detects 100% sell taxes, hidden honeypot code traps, blacklists, and liquidity pool lock statuses.
4. 📄 **Smart Contract Auditor**: Decompiles bytecode, verifies source code integrity, and flags proxy upgradeability admin risks.
5. 🌐 **Website Safety Scanner**: Inspects Web3 dApp URLs for SSL certificate validity, domain registration age, and phishing clone lookalikes.
6. 🧾 **Transaction Explainer**: Translates raw transaction payloads and unlimited spending permits into simple, understandable language.
7. 📊 **Security Command Dashboard**: Consolidated security overview featuring overall AI Security Score (0–100), active threat alerts, and quick tool launchers.
8. 📜 **Scan History & Audit Logs**: Unified index for searching, filtering, and reviewing past security audits.

---

## 🏗️ System Architecture & Technology Stack

### Architecture Layers
- **Frontend Layer**: Built with **Next.js 14** (App Router), React, TypeScript, Tailwind CSS, Lucide Icons, and Framer Motion (Dark Mode with Electric Blue, Cyan, and Purple glowing accents).
- **Backend Layer**: **FastAPI** (Python) REST API service featuring Pydantic schemas, PyJWT bearer token session handling, and security logging middleware.
- **AI Layer**: Aegivex Heuristics & OpenAI API / LangChain prompt orchestration engine.
- **Data Layer**: **SQLAlchemy ORM** supporting **PostgreSQL** with automatic local **SQLite** fallback.

---

## 📂 Project Directory Structure

```text
Aegivex AI/
├── docs/                                 # Official Specification PDFs & Logo
│   ├── logo.png                          # Official Aegivex AI Branding Logo
│   ├── Aegivex AI - Product Requirements Document (PRD).pdf
│   ├── Aegivex AI - System Architecture Document.pdf
│   ├── Aegivex AI - Database Design Document.pdf
│   ├── Aegivex AI - API Documentation.pdf
│   ├── Aegivex AI - UI-UX Specification.pdf
│   └── ...
├── backend/                              # FastAPI Python Backend Service
│   ├── main.py                           # Application entrypoint & middleware
│   ├── config.py                         # Config & separated DB parameter builder
│   ├── database/
│   │   └── database.py                   # SQLAlchemy engine & DB failover logic
│   ├── models/
│   │   └── models.py                     # 11 ORM Entities (Users, Scans, History, etc.)
│   ├── schemas/
│   │   └── schemas.py                    # Request & Response Pydantic models
│   ├── services/
│   │   ├── auth.py                       # Password hashing & JWT dependencies
│   │   └── ai_engine.py                  # AI Reasoning & Risk Engine
│   ├── routers/                          # API Router Endpoints
│   │   ├── auth.py
│   │   ├── ai.py
│   │   ├── scans.py
│   │   ├── history.py
│   │   ├── dashboard.py
│   │   ├── notifications.py
│   │   └── profile.py
│   ├── prompts/                          # AI Security System Prompts
│   ├── middleware/                       # Request Logging & Security Headers
│   ├── utils/                            # Address & Tx Hash Validation Helpers
│   ├── requirements.txt                  # Backend Python Dependencies
│   ├── .env.example                      # Template Environment Configuration
│   └── .gitignore
└── frontend/                             # Next.js Web Application
    ├── app/                              # Next.js App Router Pages
    │   ├── page.tsx                      # Landing Page
    │   ├── dashboard/                    # Security Command Dashboard
    │   ├── chat/                         # AI Security Copilot Chat
    │   ├── scanners/                     # Wallet, Token, Contract, Website, Tx Scanners
    │   ├── history/                      # Audit History
    │   └── settings/                     # User Security Settings
    ├── components/
    │   └── layout/                       # Sidebar & Header Navbar Components
    ├── services/
    │   └── api.ts                        # Axios API Client & Mock Fallback Handler
    ├── hooks/
    │   └── useAuth.ts                    # React Authentication Hook
    ├── styles/                           # Global CSS & Glassmorphism Utilities
    ├── public/                           # Public assets (Logo)
    ├── package.json                      # Frontend NPM Dependencies
    ├── .env.example                      # Frontend Environment Template
    └── .gitignore
```

---

## ⚙️ Environment Variables Setup

Database connection parameters are strictly separated into individual variables (Host, Port, User, Password, DB Name) for seamless production deployment.

### Backend Environment (`backend/.env`)

Copy `backend/.env.example` to `backend/.env`:

```env
PROJECT_NAME="Aegivex AI - Web3 Security Copilot"
VERSION="1.0.0"
API_V1_STR="/api/v1"

# JWT Secret Key
SECRET_KEY="your_secure_jwt_secret_key"

# Separated Database Connection Parameters
DB_ENGINE="postgresql"
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="aegivex_db"
DB_USER="postgres"
DB_PASSWORD="your_db_password"

# Optional: Full URL Override
# DATABASE_URL="postgresql://user:password@localhost:5432/aegivex_db"

# Optional Third-Party Keys
OPENAI_API_KEY=""
ETHERSCAN_API_KEY=""
```

### Frontend Environment (`frontend/.env.local`)

Copy `frontend/.env.example` to `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:8000/api/v1"
```

---

## 🏃 Getting Started & Running Locally

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.9 or higher
- **PostgreSQL**: (Optional, default SQLite fallback enabled)

### 2. Backend Setup & Startup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
python -m pip install -r requirements.txt

# Start FastAPI dev server
python main.py
```
*Backend API server will run at `http://localhost:8000`. Interactive Swagger UI is available at `http://localhost:8000/docs`.*

### 3. Frontend Setup & Startup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
cmd /c npm install

# Start Next.js development server
cmd /c npm run dev
```
*Frontend Web Application will run at `http://localhost:3000`.*

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register new user account |
| `POST` | `/api/v1/auth/login` | Authenticate user & return JWT token |
| `POST` | `/api/v1/auth/logout` | Terminate active user session |
| `GET` | `/api/v1/auth/me` | Fetch authenticated user profile |
| `POST` | `/api/v1/ai/chat` | Interact with AI Security Copilot |
| `POST` | `/api/v1/scan/wallet` | Scan wallet address for drainer risks |
| `POST` | `/api/v1/scan/token` | Analyze token contract for honeypot risks |
| `POST` | `/api/v1/scan/contract` | Audit smart contract bytecode & proxy flags |
| `POST` | `/api/v1/scan/website` | Scan dApp URL & SSL trust score |
| `POST` | `/api/v1/scan/transaction` | Translate transaction payload & approval risk |
| `GET` | `/api/v1/history` | Retrieve user scan history |
| `GET` | `/api/v1/dashboard` | Fetch aggregated security metrics & scores |
| `GET` | `/api/v1/notifications` | Get live threat alert notifications |

---

## 📦 Deployment Guide

- **Frontend Deployment**: Deploy `frontend/` to **Vercel** with environment variable `NEXT_PUBLIC_API_URL`.
- **Backend Deployment**: Deploy `backend/` to **Railway** or **Render** with PostgreSQL database add-on. Set `DB_ENGINE`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` environment variables in host dashboard.

---

## 📚 Documentation Index

- [Product Requirements Document (PRD)](./docs/Aegivex%20AI%20-%20Product%20Requirements%20Document%20(PRD).pdf)
- [System Architecture Document](./docs/Aegivex%20AI%20-%20System%20Architecture%20Document.pdf)
- [Database Design Document](./docs/Aegivex%20AI%20-%20Database%20Design%20Document.pdf)
- [API Documentation](./docs/Aegivex%20AI%20-%20API%20Documentation.pdf)
- [UI/UX Specification](./docs/Aegivex%20AI%20-%20UI-UX%20Specification.pdf)
- [Security Architecture](./docs/Aegivex%20AI%20-%20Security%20Architecture.pdf)

---

## 📄 License & Credits

Built for the **OKX.AI Genesis Hackathon** by the Aegivex AI Team.
