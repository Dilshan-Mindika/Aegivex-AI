# Software Requirements Specification (SRS)
## Aegivex AI — AI-Powered Web3 Security Copilot

**Document Version**: 1.0.0  
**Project Name**: Aegivex AI (OKX.AI Genesis Hackathon MVP)  
**Document Type**: Software Requirements Specification (SRS) & System Documentation  
**Prepared By**: Aegivex AI Core Engineering Team  
**Date**: July 22, 2026  
**Official Repository Assets**: [`docs/`](./docs) | Branding Logo: [`docs/logo.png`](./docs/logo.png)

---

## 📋 Table of Contents

1. [Introduction](#1-introduction)
   - [1.1 Purpose](#11-purpose)
   - [1.2 Scope](#12-scope)
   - [1.3 Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
   - [1.4 Target Audience & User Segments](#14-target-audience--user-segments)
2. [Overall System Description](#2-overall-system-description)
   - [2.1 Product Vision & Mission](#21-product-vision--mission)
   - [2.2 High-Level Architecture (4-Layer Model)](#22-high-level-architecture-4-layer-model)
   - [2.3 Operating Environment & Tech Stack](#23-operating-environment--tech-stack)
   - [2.4 Project Directory Structure](#24-project-directory-structure)
3. [Functional Requirements (Core 10 Modules)](#3-functional-requirements-core-10-modules)
   - [3.1 Module 1: Authentication & Session Management](#31-module-1-authentication--session-management)
   - [3.2 Module 2: User Profile Management](#32-module-2-user-profile-management)
   - [3.3 Module 3: Wallet Risk & Drainer Scanner](#33-module-3-wallet-risk--drainer-scanner)
   - [3.4 Module 4: Token Risk & Honeypot Analyzer](#34-module-4-token-risk--honeypot-analyzer)
   - [3.5 Module 5: Smart Contract Auditor](#35-module-5-smart-contract-auditor)
   - [3.6 Module 6: dApp & Website Safety Scanner](#36-module-6-dapp--website-safety-scanner)
   - [3.7 Module 7: Blockchain Transaction Explainer](#37-module-7-blockchain-transaction-explainer)
   - [3.8 Module 8: AI Security Copilot Chat](#38-module-8-ai-security-copilot-chat)
   - [3.9 Module 9: Security Command Dashboard](#39-module-9-security-command-dashboard)
   - [3.10 Module 10: Scan History & Notification Service](#310-module-10-scan-history--notification-service)
4. [Database Design & Data Dictionary (11 Entities)](#4-database-design--data-dictionary-11-entities)
5. [REST API Specification & Interface Payloads](#5-rest-api-specification--interface-payloads)
6. [UI/UX Specification & Design System](#6-uiux-specification--design-system)
7. [Non-Functional Requirements](#7-non-functional-requirements)
   - [7.1 Performance & Response Latency](#71-performance--response-latency)
   - [7.2 Security & Cryptography](#72-security--cryptography)
   - [7.3 Reliability & Database Failover](#73-reliability--database-failover)
   - [7.4 Usability & Accessibility](#74-usability--accessibility)
8. [Installation, Configuration & Deployment](#8-installation-configuration--deployment)
   - [8.1 Environment Variables Configuration](#81-environment-variables-configuration)
   - [8.2 Local Backend Startup](#82-local-backend-startup)
   - [8.3 Local Frontend Startup](#83-local-frontend-startup)
   - [8.4 Production Deployment Guide](#84-production-deployment-guide)
9. [Documentation Reference Index](#9-documentation-reference-index)

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) document provides a complete, authoritative description of the functional, technical, database, API, UI/UX, and security requirements for **Aegivex AI**. This document consolidates all 13 specification documents from the project's engineering blueprint into a unified reference for development, testing, and submission to the **OKX.AI Genesis Hackathon**.

### 1.2 Scope
Aegivex AI is an **AI-Powered Web3 Security Copilot**. The system combines blockchain intelligence heuristics with artificial intelligence reasoning (OpenAI API / LangChain / LangGraph) to analyze Web3 security risks in real time. It protects users from wallet drainers, token honeypots, malicious smart contracts, phishing websites, and dangerous transaction approvals by translating complex bytecodes and permit calls into clear, plain-language recommendations.

### 1.3 Definitions, Acronyms, and Abbreviations
- **EVM**: Ethereum Virtual Machine
- **dApp**: Decentralized Application
- **Honeypot**: A token smart contract designed to allow buying but block selling (100% sell tax or hidden blacklists).
- **Drainer**: A malicious smart contract that tricks users into signing unlimited asset transfer permits.
- **JWT**: JSON Web Token
- **ORM**: Object-Relational Mapping (SQLAlchemy)
- **RPC**: Remote Procedure Call (Blockchain Provider Node)

### 1.4 Target Audience & User Segments
| User Category | Description & Target Segments |
| :--- | :--- |
| **Primary Users** | Crypto Beginners, Traders, DeFi Investors, NFT Collectors |
| **Secondary Users** | Blockchain Developers, Security Auditors, Community Managers |
| **Enterprise Users** | Web3 Wallet Providers, Exchanges, Security Research Teams |

---

## 2. Overall System Description

### 2.1 Product Vision & Mission
- **Vision**: To become the most trusted AI-powered security assistant for the Web3 ecosystem.
- **Mission**: Help users make safer blockchain decisions by providing instant AI-powered security analysis and easy-to-understand explanations.

### 2.2 High-Level Architecture (4-Layer Model)
The system architecture follows a service-oriented, 4-layer model:

```text
[ User ] 
   │
   ▼
[ Layer 1: Frontend (Next.js 14 + Tailwind CSS + Framer Motion) ]
   │
   ▼  (REST API / JWT Bearer Tokens)
[ Layer 2: Backend (FastAPI + Pydantic + Security Middleware) ]
   │
   ├──► [ Layer 3: AI Engine (LangChain + Aegivex Heuristic Engine) ]
   │       │
   │       └──► External Services (OpenAI API / RPC Nodes / Block Explorers)
   │
   └──► [ Layer 4: Data Layer (SQLAlchemy ORM -> PostgreSQL / SQLite Failover) ]
```

### 2.3 Operating Environment & Tech Stack

```text
+-------------------------------------------------------------------------+
|                              AEGIVEX AI STACK                           |
+-------------------------------------------------------------------------+
| FRONTEND | Next.js 14 (App Router), React, TypeScript, Tailwind CSS,     |
|          | Lucide React Icons, Framer Motion, Axios                    |
+-------------------------------------------------------------------------+
| BACKEND  | Python 3.9+, FastAPI, Uvicorn, Pydantic v2, PyJWT, Passlib,   |
|          | Bcrypt, Python-Dotenv                                        |
+-------------------------------------------------------------------------+
| DATABASE | PostgreSQL (Primary Production Engine via psycopg2)           |
|          | SQLite3 (Automated Local Failover Engine via SQLAlchemy)     |
+-------------------------------------------------------------------------+
| AI & RPC | OpenAI API, LangChain Prompt Orchestration, Web3 RPC         |
+-------------------------------------------------------------------------+
```

### 2.4 Project Directory Structure

```text
Aegivex AI/
├── docs/                                 # Official Specifications & Logo Assets
│   ├── logo.png                          # Official Aegivex AI Logo
│   ├── Aegivex AI - Product Requirements Document (PRD).pdf
│   ├── Aegivex AI - System Architecture Document.pdf
│   ├── Aegivex AI - Database Design Document.pdf
│   ├── Aegivex AI - API Documentation.pdf
│   ├── Aegivex AI - UI-UX Specification.pdf
│   └── ...
├── backend/                              # FastAPI Python Backend Service
│   ├── main.py                           # Application Entrypoint & Middleware Mounts
│   ├── config.py                         # Settings & Separated DB Parameter Builder
│   ├── database/
│   │   └── database.py                   # SQLAlchemy Engine & Automatic DB Failover
│   ├── models/
│   │   └── models.py                     # 11 Relational ORM Entities
│   ├── schemas/
│   │   └── schemas.py                    # Pydantic Schemas for Validation
│   ├── services/
│   │   ├── auth.py                       # Bcrypt Password Hashing & JWT Handlers
│   │   └── ai_engine.py                  # AI Reasoning & Heuristic Engine
│   ├── routers/                          # API Router Controllers
│   │   ├── auth.py
│   │   ├── ai.py
│   │   ├── scans.py
│   │   ├── history.py
│   │   ├── dashboard.py
│   │   ├── notifications.py
│   │   └── profile.py
│   ├── prompts/                          # System Security Prompts
│   │   └── security_prompts.py
│   ├── middleware/                       # Request Logger & Security Headers
│   │   └── logging_middleware.py
│   ├── utils/                            # EVM & Transaction Helper Functions
│   │   └── helpers.py
│   ├── requirements.txt                  # Python Package Manifest
│   ├── .env.example                      # Sanitized Environment Template
│   ├── .env                              # Active Local Environment
│   └── .gitignore                        # Backend Git Exclusions
└── frontend/                             # Next.js Web Application
    ├── app/                              # App Router Pages
    │   ├── page.tsx                      # Landing Page
    │   ├── dashboard/page.tsx            # Security Command Dashboard
    │   ├── chat/page.tsx                 # AI Security Chat Copilot
    │   ├── scanners/
    │   │   ├── wallet/page.tsx           # Wallet Risk Scanner
    │   │   ├── token/page.tsx            # Token Risk Analyzer
    │   │   ├── contract/page.tsx         # Smart Contract Auditor
    │   │   ├── website/page.tsx          # dApp Website Scanner
    │   │   └── transaction/page.tsx      # Transaction Explainer
    │   ├── history/page.tsx              # Audit Scan History
    │   ├── settings/page.tsx             # User Security Settings
    │   ├── login/page.tsx                # Authentication Sign In
    │   └── register/page.tsx             # Account Registration
    ├── components/
    │   └── layout/                       # Sidebar & Top Navbar Components
    ├── services/
    │   └── api.ts                        # Axios Client & Offline Mock Handler
    ├── hooks/
    │   └── useAuth.ts                    # React Authentication State Hook
    ├── styles/                           # Global CSS & Glassmorphism Styling
    │   └── globals.css
    ├── public/                           # Public Static Assets (logo.png)
    ├── package.json                      # Node Package Manifest
    ├── .env.example                      # Frontend Environment Template
    ├── .env.local                        # Active Local Frontend Environment
    └── .gitignore                        # Frontend Git Exclusions
```

---

## 3. Functional Requirements (Core 10 Modules)

### 3.1 Module 1: Authentication & Session Management
- **FR-1.1**: The system shall allow users to register with `name`, `email`, and `password`. Passwords must be hashed using `bcrypt`.
- **FR-1.2**: The system shall authenticate users via `POST /api/v1/auth/login` and issue a signed JWT Bearer Token (valid for 7 days by default).
- **FR-1.3**: The system shall enforce token verification on protected endpoints via `get_current_user` dependency.
- **FR-1.4**: Active sessions shall be logged in the `user_sessions` table with IP address and user-agent details.

### 3.2 Module 2: User Profile Management
- **FR-2.1**: Authenticated users can retrieve profile information (`GET /api/v1/profile` or `/auth/me`).
- **FR-2.2**: Users can update their profile name and avatar image URL (`PUT /api/v1/profile`).

### 3.3 Module 3: Wallet Risk & Drainer Scanner
- **FR-3.1**: Accepts EVM (42-char 0x...) and Solana wallet addresses (`POST /api/v1/scan/wallet`).
- **FR-3.2**: Evaluates wallet activity, drainer interactions, and phishing reports.
- **FR-3.3**: Calculates a numerical risk score (0–100) and categorical rating (`Low`, `Medium`, `High`).
- **FR-3.4**: Returns a summary narrative and actionable security recommendation.
- **FR-3.5**: Automatically indexes scan output in `scan_history` and emits a `Notification` if risk is High.

### 3.4 Module 4: Token Risk & Honeypot Analyzer
- **FR-4.1**: Accepts token smart contract addresses (`POST /api/v1/scan/token`).
- **FR-4.2**: Analyzes contract code for honeypot indicators (100% sell tax, disabled transfer functions, buyer blacklists).
- **FR-4.3**: Returns token name, ticker symbol, verified liquidity status, honeypot boolean flag, risk rating, and recommendation.

### 3.5 Module 5: Smart Contract Auditor
- **FR-5.1**: Accepts contract addresses (`POST /api/v1/scan/contract`).
- **FR-5.2**: Audits bytecode and source verification status (`verified: boolean`).
- **FR-5.3**: Inspects contract architecture for Upgradeable Proxy Patterns (`proxy_contract: boolean`).
- **FR-5.4**: Generates risk score and reentrancy / admin backdoor audit findings.

### 3.6 Module 6: dApp & Website Safety Scanner
- **FR-6.1**: Accepts Web3 dApp URLs (`POST /api/v1/scan/website`).
- **FR-6.2**: Validates SSL/TLS certificate status and domain registration age.
- **FR-6.3**: Detects phishing keywords (`claim-airdrop`, `free-nft`, `connect-wallet-now`) and domain spoofing.
- **FR-6.4**: Returns trust score (0–100%) and phishing warnings.

### 3.7 Module 7: Blockchain Transaction Explainer
- **FR-7.1**: Accepts 66-character raw transaction hashes (`POST /api/v1/scan/transaction`).
- **FR-7.2**: Identifies target blockchain network (Ethereum, OKX X Layer, Arbitrum, Polygon, Base).
- **FR-7.3**: Flags dangerous permissions, such as **Unlimited ERC-20 Asset Approval** requests.
- **FR-7.4**: Translates raw payload into plain-language warnings.

### 3.8 Module 8: AI Security Copilot Chat
- **FR-8.1**: Provides an interactive conversation interface (`POST /api/v1/ai/chat`).
- **FR-8.2**: Processes user queries regarding Web3 security, honeypot mechanics, drainers, and contract code logic.
- **FR-8.3**: Returns response text, AI confidence level (%), risk score, and model identifier (`Aegivex-SecCopilot-v1`).
- **FR-8.4**: Logs chat history in `ai_conversations`.

### 3.9 Module 9: Security Command Dashboard
- **FR-9.1**: Aggregates platform statistics for the authenticated user (`GET /api/v1/dashboard`).
- **FR-9.2**: Displays total scans count, breakdown by scanner type, average risk score, active threats count, and overall **AI Security Score** (formula: `100 - avg_risk_score`).

### 3.10 Module 10: Scan History & Notification Service
- **FR-10.1**: Provides unified historical log querying (`GET /api/v1/history`).
- **FR-10.2**: Provides unread threat alert notifications (`GET /api/v1/notifications`).

---

## 4. Database Design & Data Dictionary (11 Entities)

The database schema comprises **11 relational tables** configured in SQLAlchemy ORM:

```text
                    ┌──────────────┐
                    │    users     │ (Central Entity)
                    └──────┬───────┘
                           │ 1:N
   ┌───────────────────────┼───────────────────────┬───────────────────────┐
   │                       │                       │                       │
   ▼                       ▼                       ▼                       ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│user_sessions │   │ai_conversat. │   │ wallet_scans │   │ token_scans  │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
   │                       │                       │                       │
   ▼                       ▼                       ▼                       ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│contract_scans│   │website_scans │   │tx_scans      │   │ scan_history │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
   │                       │                       │
   ▼                       ▼                       ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│notifications │   │  audit_logs  │   │              │
└──────────────┘   └──────────────┘   └──────────────┘
```

### Table 4.1: `users`
| Column Name | Data Type | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR (UUID) | No | `uuid4()` | Primary Key |
| `name` | VARCHAR | No | - | User full name |
| `email` | VARCHAR | No | - | Unique email address (Indexed) |
| `password_hash` | VARCHAR | No | - | Bcrypt hashed password |
| `profile_image` | VARCHAR | Yes | `"avatar.png"` | Profile avatar path |
| `role` | VARCHAR | No | `"User"` | Role (`User`, `Admin`) |
| `status` | VARCHAR | No | `"Active"` | Account status |
| `created_at` | DATETIME | No | `utcnow()` | Registration timestamp |
| `updated_at` | DATETIME | No | `utcnow()` | Last update timestamp |

### Table 4.2: `user_sessions`
| Column Name | Data Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR (UUID) | No | Primary Key |
| `user_id` | VARCHAR (UUID) | No | Foreign Key -> `users.id` |
| `jwt_token` | TEXT | No | Encoded JWT Bearer Token |
| `device` | VARCHAR | Yes | User agent / device string |
| `ip_address` | VARCHAR | Yes | Client IP address |
| `expires_at` | DATETIME | No | Expiration timestamp |
| `created_at` | DATETIME | No | Session creation timestamp |

### Table 4.3: `ai_conversations`
| Column Name | Data Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR (UUID) | No | Primary Key |
| `user_id` | VARCHAR (UUID) | No | Foreign Key -> `users.id` |
| `prompt` | TEXT | No | User prompt input |
| `response` | TEXT | No | AI generated response |
| `tokens_used` | INTEGER | No | Token usage count |
| `model` | VARCHAR | No | Model name (`Aegivex-SecCopilot-v1`) |
| `created_at` | DATETIME | No | Timestamp (Indexed) |

### Table 4.4: `wallet_scans`
| Column Name | Data Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR (UUID) | No | Primary Key |
| `user_id` | VARCHAR (UUID) | No | Foreign Key -> `users.id` |
| `wallet_address` | VARCHAR | No | Target wallet address (Indexed) |
| `risk_score` | INTEGER | No | Numerical score (0–100) |
| `risk_level` | VARCHAR | No | Categorical rating (`Low`, `Medium`, `High`) |
| `summary` | TEXT | No | AI summary narrative |
| `recommendation` | TEXT | No | Actionable guidance |
| `created_at` | DATETIME | No | Timestamp |

### Table 4.5: `token_scans`
| Column Name | Data Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR (UUID) | No | Primary Key |
| `user_id` | VARCHAR (UUID) | No | Foreign Key -> `users.id` |
| `contract_address` | VARCHAR | No | Token contract address (Indexed) |
| `token_name` | VARCHAR | No | Token full name |
| `symbol` | VARCHAR | No | Token ticker symbol |
| `risk_score` | INTEGER | No | Risk score (0–100) |
| `risk_level` | VARCHAR | No | Risk rating (`Low`, `Medium`, `High`) |
| `liquidity` | VARCHAR | Yes | Verified liquidity pool details |
| `honeypot` | BOOLEAN | No | Honeypot boolean flag |
| `recommendation` | TEXT | No | Security recommendation |
| `created_at` | DATETIME | No | Timestamp |

### Table 4.6: `contract_scans`
| Column Name | Data Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR (UUID) | No | Primary Key |
| `user_id` | VARCHAR (UUID) | No | Foreign Key -> `users.id` |
| `contract_address` | VARCHAR | No | Smart contract address (Indexed) |
| `verified` | BOOLEAN | No | Source code verification status |
| `proxy_contract` | BOOLEAN | No | Proxy contract indicator flag |
| `risk_score` | INTEGER | No | Calculated risk score |
| `risk_level` | VARCHAR | No | Risk classification |
| `recommendation` | TEXT | No | Audit findings summary |
| `created_at` | DATETIME | No | Timestamp |

### Table 4.7: `website_scans`
| Column Name | Data Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR (UUID) | No | Primary Key |
| `user_id` | VARCHAR (UUID) | No | Foreign Key -> `users.id` |
| `website_url` | VARCHAR | No | Target URL (Indexed) |
| `ssl_status` | VARCHAR | No | SSL certificate status |
| `domain_age` | VARCHAR | No | Domain registration age |
| `trust_score` | INTEGER | No | Trust rating (0–100%) |
| `risk_level` | VARCHAR | No | Risk assessment |
| `recommendation` | TEXT | No | Action recommendation |
| `created_at` | DATETIME | No | Timestamp |

### Table 4.8: `transaction_scans`
| Column Name | Data Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR (UUID) | No | Primary Key |
| `user_id` | VARCHAR (UUID) | No | Foreign Key -> `users.id` |
| `transaction_hash` | VARCHAR | No | Transaction hash (Indexed) |
| `network` | VARCHAR | No | Blockchain network name |
| `risk_score` | INTEGER | No | Calculated risk score |
| `risk_level` | VARCHAR | No | Assessed risk level |
| `summary` | TEXT | No | Plain-language payload summary |
| `recommendation` | TEXT | No | Safety guidance |
| `created_at` | DATETIME | No | Timestamp |

### Table 4.9: `scan_history`
| Column Name | Data Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR (UUID) | No | Primary Key |
| `user_id` | VARCHAR (UUID) | No | Foreign Key -> `users.id` |
| `scan_type` | VARCHAR | No | Type (`wallet`, `token`, `contract`, `website`, `transaction`) |
| `reference_id` | VARCHAR | No | ID of scan record in specific table |
| `target` | VARCHAR | No | Target address or URL |
| `risk_score` | INTEGER | No | Overall risk score |
| `risk_level` | VARCHAR | No | Categorical risk rating |
| `created_at` | DATETIME | No | Timestamp (Indexed) |

### Table 4.10: `notifications`
| Column Name | Data Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR (UUID) | No | Primary Key |
| `user_id` | VARCHAR (UUID) | No | Foreign Key -> `users.id` |
| `title` | VARCHAR | No | Notification title |
| `message` | TEXT | No | Notification message body |
| `type` | VARCHAR | No | Alert level (`Info`, `Warning`, `Critical`) |
| `is_read` | BOOLEAN | No | Read status flag |
| `created_at` | DATETIME | No | Timestamp |

### Table 4.11: `audit_logs`
| Column Name | Data Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR (UUID) | No | Primary Key |
| `user_id` | VARCHAR (UUID) | Yes | Foreign Key -> `users.id` |
| `action` | VARCHAR | No | Security action identifier |
| `resource` | VARCHAR | No | Target URI resource |
| `status` | VARCHAR | No | Execution status |
| `ip_address` | VARCHAR | Yes | Originating IP |
| `created_at` | DATETIME | No | Timestamp |

---

## 5. REST API Specification & Interface Payloads

Base URL: `http://localhost:8000/api/v1`  
Content-Type: `application/json`  
Authentication: `Authorization: Bearer <JWT_TOKEN>`

### 5.1 Registration Endpoint
- **Request**: `POST /auth/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```
- **Response** (`200 OK`):
```json
{
  "success": true,
  "message": "User registered successfully."
}
```

### 5.2 Login Endpoint
- **Request**: `POST /auth/login`
```json
{
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```
- **Response** (`200 OK`):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsIn...",
  "token_type": "Bearer"
}
```

### 5.3 Wallet Scanner Endpoint
- **Request**: `POST /scan/wallet`
```json
{
  "wallet_address": "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
}
```
- **Response** (`200 OK`):
```json
{
  "id": "c1f2a3...",
  "wallet_address": "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  "risk_score": 18,
  "risk_level": "Low",
  "summary": "Standard EVM wallet address. 0 drainer contract interactions detected in past 30 days.",
  "recommendation": "Safe for standard token transfers and smart contract interactions.",
  "created_at": "2026-07-22T10:15:00Z"
}
```

### 5.4 Token Analyzer Endpoint
- **Request**: `POST /scan/token`
```json
{
  "contract_address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
}
```
- **Response** (`200 OK`):
```json
{
  "id": "e4f5a6...",
  "contract_address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
  "token_name": "Uniswap Token",
  "symbol": "UNI",
  "risk_score": 12,
  "risk_level": "Low",
  "liquidity": "$12,450,000 USD (Locked)",
  "honeypot": false,
  "recommendation": "Verified token contract. Standard slippage controls recommended.",
  "created_at": "2026-07-22T10:20:00Z"
}
```

### 5.5 AI Security Chat Endpoint
- **Request**: `POST /ai/chat`
```json
{
  "prompt": "Is wallet address 0x71C7656EC7ab88b098defB751B7401B5f6d8976F safe?"
}
```
- **Response** (`200 OK`):
```json
{
  "id": "b89012...",
  "prompt": "Is wallet address 0x71C7656EC7ab88b098defB751B7401B5f6d8976F safe?",
  "response": "When checking a Web3 wallet address, Aegivex AI scans historical transaction patterns, drainer contract interactions, and blacklist databases. Always verify the address on block explorers before sending assets.",
  "risk_score": 15,
  "confidence": 96,
  "model": "Aegivex-SecCopilot-v1",
  "created_at": "2026-07-22T10:25:00Z"
}
```

---

## 6. UI/UX Specification & Design System

The user interface strictly adheres to the UI/UX Specification Document:

### Design Tokens & Color Usage Guidelines
- **Theme**: Dark Mode Default (`#080c14` background, `#0f172a` surfaces, `#1e293b` glass cards)
- **Primary Accent**: Electric Blue (`#3b82f6` / `#2563eb`)
- **Secondary Accent**: Cyan (`#06b6d4`)
- **Intelligence Accent**: Purple (`#a855f7`)

| Color | Meaning / Use Case |
| :--- | :--- |
| **Green (`#10b981`)** | Safe / Low Risk / Verified |
| **Yellow (`#f59e0b`)** | Warning / Notice |
| **Orange (`#f97316`)** | Medium Risk |
| **Red (`#ef4444`)** | High Risk / Honeypot Alert / Critical Danger |
| **Blue (`#3b82f6`)** | Information / Navigation / System Updates |
| **Purple (`#a855f7`)** | AI Features & Intelligence Copilot Insights |

### Screen Specifications
1. **Landing Page (`app/page.tsx`)**: Hero banner with glowing background blur, OKX.AI Genesis Hackathon badge, 6 core scanner cards, interactive live preview banner, and CTA buttons.
2. **Dashboard (`app/dashboard/page.tsx`)**: AI Security Score gauge (0–100), total scan metrics, quick scanner launchers grid, recent scan history table, and live threat alert notifications.
3. **AI Chat (`app/chat/page.tsx`)**: Conversation stream with prompt suggestion pills and confidence indicators.
4. **Scanners (`app/scanners/*`)**: Dedicated input forms and security analysis cards for Wallet, Token, Contract, Website, and Transaction payloads.
5. **History (`app/history/page.tsx`)**: Searchable and filterable audit history log.
6. **Settings (`app/settings/page.tsx`)**: Profile management and custom API key configuration.

---

## 7. Non-Functional Requirements

### 7.1 Performance & Response Latency
- **NFR-1.1**: Security scan requests shall complete within **5 seconds** (Target: &lt; 2 seconds for heuristic evaluation).
- **NFR-1.2**: Next.js static page generation and client bundle size optimized under **128 kB** First Load JS.

### 7.2 Security & Cryptography
- **NFR-2.1**: All passwords encrypted using **bcrypt**. Plaintext storage is strictly prohibited.
- **NFR-2.2**: Primary key strategy uses **UUIDv4** string identifiers to prevent enumeration attacks.
- **NFR-2.3**: API requests protected against SQL injection via SQLAlchemy ORM parameter binding.
- **NFR-2.4**: Enforces security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`) on all backend API responses.

### 7.3 Reliability & Database Failover
- **NFR-3.1**: Target **99.9% uptime**.
- **NFR-3.2**: Database connection engine features automatic failover handler: if PostgreSQL is offline or uninitialized, the system seamlessly falls back to local SQLite so application features remain available without crashing.

### 7.4 Usability & Accessibility
- **NFR-4.1**: Full keyboard navigation support and high-contrast WCAG compliant color ratios.
- **NFR-4.2**: Semantic HTML structure compatible with screen readers.

---

## 8. Installation, Configuration & Deployment

### 8.1 Environment Variables Configuration

Database connection parameters are separated into individual variables (Engine, Host, Port, Name, User, Password) for deployment flexibility.

#### Backend Environment Template (`backend/.env.example`)
```env
PROJECT_NAME="Aegivex AI - Web3 Security Copilot"
VERSION="1.0.0"
API_V1_STR="/api/v1"

# JWT Secret Key
SECRET_KEY="your_secure_jwt_secret_key_here"

# Separated Database Parameters (Easy Deployment)
DB_ENGINE="postgresql"
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="aegivex_db"
DB_USER="your_db_username"
DB_PASSWORD="your_db_password"

# Optional Third-Party Keys
OPENAI_API_KEY="your_openai_api_key_here"
ETHERSCAN_API_KEY="your_etherscan_api_key_here"
```

#### Local Active Environment (`backend/.env`)
```env
PROJECT_NAME="Aegivex AI - Web3 Security Copilot"
VERSION="1.0.0"
API_V1_STR="/api/v1"
SECRET_KEY="aegivex-ai-dev-secret-key-2026-okx-genesis"
DB_ENGINE="postgresql"
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="aegivex_db"
DB_USER="postgres"
DB_PASSWORD="your_local_password"
```

#### Frontend Active Environment (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL="http://localhost:8000/api/v1"
```

---

### 8.2 Local Backend Startup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install Python dependencies
python -m pip install -r requirements.txt

# 3. Launch FastAPI application server
python main.py
```
*Backend server runs at `http://localhost:8000`. Swagger documentation available at `http://localhost:8000/docs`.*

---

### 8.3 Local Frontend Startup

```bash
# 1. Open a new terminal and navigate to frontend directory
cd frontend

# 2. Install Node dependencies
cmd /c npm install

# 3. Launch Next.js development server
cmd /c npm run dev
```
*Frontend application runs at `http://localhost:3000`.*

---

### 8.4 Production Deployment Guide
- **Frontend (Vercel)**: Connect Git repository, set root directory to `frontend/`, and add environment variable `NEXT_PUBLIC_API_URL`.
- **Backend (Railway / Render)**: Connect Git repository, set root directory to `backend/`, add PostgreSQL database service, and configure `DB_ENGINE`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`.

---

## 9. Documentation Reference Index

All original architectural PDFs and branding assets are organized in the [`docs/`](./docs) folder:

- 📄 [Aegivex AI - Product Requirements Document (PRD)](./docs/Aegivex%20AI%20-%20Product%20Requirements%20Document%20(PRD).pdf)
- 📄 [Aegivex AI - System Architecture Document](./docs/Aegivex%20AI%20-%20System%20Architecture%20Document.pdf)
- 📄 [Aegivex AI - Database Design Document](./docs/Aegivex%20AI%20-%20Database%20Design%20Document.pdf)
- 📄 [Aegivex AI - API Documentation](./docs/Aegivex%20AI%20-%20API%20Documentation.pdf)
- 📄 [Aegivex AI - UI-UX Specification](./docs/Aegivex%20AI%20-%20UI-UX%20Specification.pdf)
- 📄 [Aegivex AI - Feature Specification](./docs/Aegivex%20AI%20-%20Feature%20Specification.pdf)
- 📄 [Aegivex AI - Security Architecture](./docs/Aegivex%20AI%20-%20Security%20Architecture.pdf)
- 📄 [Aegivex AI - Deployment Guide](./docs/Aegivex%20AI%20-%20Deployment%20Guide.pdf)
- 📄 [Aegivex AI - Testing Guide](./docs/Aegivex%20AI%20-%20Testing%20Guide.pdf)
- 📄 [Developer Wiki - Aegivex AI](./docs/Developer%20Wiki%20-%20Aegivex%20AI.pdf)
- 📄 [AI Prompt Engineering Guide](./docs/AI%20Prompt%20Engineering%20Guide%20-%20Aegivex%20AI.pdf)
- 📄 [Aegivex AI Project Overview MVP](./docs/Aegivex_AI_Project_Overview_MVP.pdf)
- 🎨 [Official Logo Asset](./docs/logo.png)

---

**Built for the OKX.AI Genesis Hackathon** by the Aegivex AI Team.
