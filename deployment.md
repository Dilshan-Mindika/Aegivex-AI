# 🚀 Aegivex AI — 100% Free Production Deployment Guide

This guide provides a comprehensive, step-by-step walkthrough to deploy **Aegivex AI** (Frontend, Backend, Database, and Multi-Provider AI Engine) completely **100% FREE** using production-grade cloud platforms.

---

## 📋 100% Free Cloud Infrastructure Architecture

| Layer | Platform | Free Tier Specifications | Cost |
| :--- | :--- | :--- | :---: |
| **Frontend UI** | **[Vercel](https://vercel.com)** | Unlimited Next.js 14 Deploys, Global CDN, SSL Certificates, Custom Domains | **$0.00** |
| **Backend API** | **[Render.com](https://render.com)** or **[Koyeb](https://koyeb.com)** | Free Web Service Tier, Automatic HTTPS, Continuous Git Deployment | **$0.00** |
| **Cloud Database** | **[Neon.tech](https://neon.tech)** or **[Supabase](https://supabase.com)** | Managed PostgreSQL 16, 0.5 GiB Storage, SSL Connections, Point-in-Time Recovery | **$0.00** |
| **AI LLM Engine** | **[Groq Cloud](https://console.groq.com)** & **[OpenRouter](https://openrouter.ai)** | Free Tier Llama 3 & OpenRouter Free Models (Zero credit card required) | **$0.00** |

---

## 🛠️ Step 1: Git Repository Setup & GitHub Push

1. Open your terminal in the project root folder:
   ```bash
   cd "d:\Projects\Aegivex AI"
   ```

2. Initialize and push the repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete production release for Aegivex AI"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/Aegivex-AI.git
   git push -u origin main
   ```

---

## 🗄️ Step 2: Provision Free PostgreSQL Database (Neon.tech or Supabase)

### Option A: Neon.tech (Recommended - 100% Free Serverless Postgres)
1. Go to **[Neon.tech](https://neon.tech)** and sign up for a free account.
2. Click **Create Project** -> Project Name: `aegivex-db` -> Postgres Version: `16`.
3. Copy your Connection String from the dashboard dashboard (Connection Details):
   ```
   postgresql://aegivex_owner:YOUR_PASSWORD@ep-sample-123456.us-east-2.aws.neon.tech/aegivex-db?sslmode=require
   ```

### Option B: Supabase (Alternative Free Managed Postgres)
1. Sign up at **[Supabase.com](https://supabase.com)**.
2. Create project `aegivex-db` and copy the URI under **Settings -> Database -> Connection String (Transaction Pooler)**.

---

## ⚙️ Step 3: Deploy FastAPI Backend Web Service (Render.com / Koyeb)

### Deploying on Render.com (100% Free)
1. Go to **[Render.com Dashboard](https://dashboard.render.com)** and click **New +** -> **Web Service**.
2. Connect your GitHub repository (`Aegivex-AI`).
3. Configure the deployment settings:
   - **Name**: `aegivex-api`
   - **Region**: Select nearest region (e.g. Frankfurt / Oregon)
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add the **Environment Variables** under the **Environment** tab:

   | Variable Key | Value / Example |
   | :--- | :--- |
   | `DATABASE_URL` | `postgresql://aegivex_owner:YOUR_PASSWORD@ep-sample-123456.us-east-2.aws.neon.tech/aegivex-db?sslmode=require` |
   | `GROQ_API_KEY` | `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` |
   | `OPENROUTER_API_KEY` | `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` |
   | `JWT_SECRET` | `aegivex_super_secret_jwt_key_998877665544332211` |
   | `JWT_ALGORITHM` | `HS256` |
   | `ACCESS_TOKEN_EXPIRE_MINUTES` | `10080` |
   | `CORS_ORIGINS` | `*` |

5. Click **Create Web Service**. Render will build and deploy your API automatically!
6. Copy your deployed backend API URL (e.g. `https://aegivex-api.onrender.com`).

---

## 💻 Step 4: Deploy Next.js 14 Frontend (Vercel)

1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)** and click **Add New...** -> **Project**.
2. Import your GitHub repository (`Aegivex-AI`).
3. Configure the deployment settings:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click **Edit** and select `frontend`.
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
4. Expand **Environment Variables** and add:

   | Variable Key | Value / Example |
   | :--- | :--- |
   | `NEXT_PUBLIC_API_URL` | `https://aegivex-api.onrender.com/api/v1` |
   | `NEXT_PUBLIC_APP_NAME` | `Aegivex AI` |

5. Click **Deploy**. Vercel will compile Next.js and generate your production URL (e.g., `https://aegivex-ai.vercel.app`).

---

## 🗄️ Step 5: Database Seeding & Pre-Configured Accounts Setup

Once your backend API is deployed on Render/Koyeb and connected to Neon/Supabase PostgreSQL, run the seeding script to create the pre-configured Admin and User accounts in cloud production:

```bash
cd backend
# Set DATABASE_URL to your production Postgres URL temporarily:
set DATABASE_URL=postgresql://aegivex_owner:YOUR_PASSWORD@ep-sample-123456.us-east-2.aws.neon.tech/aegivex-db?sslmode=require
python seed.py
```

### 🔑 Production Pre-Seeded Accounts Summary

| User Account Role | Email Address | Default Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **System Administrator** ⭐ | `admin@aegivex.ai` | `AdminPassword123!` | Super Admin Control Center (`/admin/dashboard`), Live Support Desk Inbox, User Role Management. |
| **Regular User** 🛡️ | `user@aegivex.ai` | `UserPassword123!` | Dashboard (`/dashboard`), AI Chat (`/chat`), Scanners (`/scanners/*`), Scan History (`/history`). |

---

## 🧪 Step 6: Production Health Check & Verification

1. Open your browser and navigate to your production URL:
   `https://aegivex-ai.vercel.app`
2. Test authentication:
   - Click **Sign In** and enter `user@aegivex.ai` / `UserPassword123!`.
   - Verify redirection to `/dashboard`.
3. Test Web3 Scanners:
   - Open **Wallet Risk Scanner** -> Enter `0x71C7656EC7ab88b098defB751B7401B5f6d8976F` -> Verify instant risk score generation.
4. Test AI Copilot Chat:
   - Open **AI Security Chat** -> Ask *"Is this contract safe?"* -> Verify multi-provider response from Groq/OpenRouter.
5. Test Password Recovery:
   - Go to `/forgot-password` -> Request reset code -> Enter `AEGIVEX-8899` -> Verify password update.

---

## 📜 Summary of Free Cloud Resources

```mermaid
graph TD
  User([User Web Browser]) -->|HTTPS Requests| Vercel[Vercel - Next.js Frontend\nhttps://aegivex-ai.vercel.app]
  Vercel -->|REST API Calls| Render[Render / Koyeb - FastAPI Backend\nhttps://aegivex-api.onrender.com]
  Render -->|SQL Queries| Neon[Neon.tech / Supabase - PostgreSQL 16]
  Render -->|LLM Requests| Groq[Groq Cloud API & OpenRouter LLM]
```

🎉 **Congratulations! Your Aegivex AI Web3 Security Copilot platform is now live and deployed 100% FREE!**
