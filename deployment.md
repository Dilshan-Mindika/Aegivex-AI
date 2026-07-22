# 🚀 Aegivex AI — 100% Free Production Deployment Guide (NO Credit Card Required)

This guide provides 3 top solutions to deploy **Aegivex AI** completely **100% FREE without entering any credit card or payment details**.

---

## 📋 Zero Credit Card Cloud Infrastructure Options

| Layer | Recommended Platform | Free Tier Benefits | Credit Card Required? |
| :--- | :--- | :--- | :---: |
| **Frontend UI** | **[Vercel](https://vercel.com)** | Next.js 14 Web Hosting, Global CDN, SSL | **NO ❌** |
| **Backend API (Option 1)**| **[Vercel Python](https://vercel.com)** | Serverless Python FastAPI Functions | **NO ❌** |
| **Backend API (Option 2)**| **[Koyeb](https://koyeb.com)** | Free Web Service Instance, Docker/Buildpack | **NO ❌** |
| **Backend API (Option 3)**| **[Hugging Face Spaces](https://huggingface.co)** | Free Docker Web Container | **NO ❌** |
| **Cloud Database** | **[Neon.tech](https://neon.tech)** | Serverless PostgreSQL 16 (Connected & Seeded) | **NO ❌** |

---

## 🌟 BACKEND SOLUTION 1: Deploy Backend to Vercel (100% Free - NO Credit Card Required)

Since Vercel requires **ZERO credit card details**, you can deploy the FastAPI backend directly on Vercel as a Python Serverless Web Service!

### Steps:
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: configure Vercel and Koyeb zero-card backend deployments"
   git push origin main
   ```
2. Go to **[Vercel Dashboard](https://vercel.com/dashboard)** -> Click **Add New...** -> **Project**.
3. Select your GitHub repository (`Aegivex-AI`).
4. Set **Root Directory**: Select `backend`.
5. Expand **Environment Variables** and add:

   | Variable Key | Value |
   | :--- | :--- |
   | `DATABASE_URL` | `postgresql://neondb_owner:npg_AHzFiXh8QK3m@ep-nameless-tooth-azlinshz-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` |
   | `GROQ_API_KEY` | `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` |
   | `OPENROUTER_API_KEY` | `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` |
   | `JWT_SECRET` | `aegivex_super_secret_jwt_key_998877665544332211` |

6. Click **Deploy**. Vercel will deploy your FastAPI backend with automatic HTTPS (e.g., `https://aegivex-api.vercel.app`) without asking for a credit card!

---

## 🌟 BACKEND SOLUTION 2: Deploy Backend to Koyeb (100% Free - NO Credit Card Required)

Koyeb offers a dedicated 100% free web service tier that does **not** prompt for billing details or credit card verification!

### Steps:
1. Go to **[Koyeb.com](https://www.koyeb.com)** and sign up with GitHub.
2. Click **Create Service** -> Select **GitHub**.
3. Choose repository `Aegivex-AI`.
4. Configure service settings:
   - **Root Directory**: `backend`
   - **Builder**: `Dockerfile` (or Buildpack)
   - **Port**: `8000`
5. Add Environment Variables:
   - `DATABASE_URL`: `postgresql://neondb_owner:npg_AHzFiXh8QK3m@ep-nameless-tooth-azlinshz-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
   - `GROQ_API_KEY`: `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`
   - `OPENROUTER_API_KEY`: `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`
   - `JWT_SECRET`: `aegivex_super_secret_jwt_key_998877665544332211`
6. Click **Deploy**. Your backend will be live at `https://<your-app-name>.koyeb.app`.

---

## 🌟 BACKEND SOLUTION 3: Deploy Backend to Hugging Face Spaces (100% Free - NO Credit Card Required)

Hugging Face Spaces allows you to host Dockerized FastAPI containers **100% free forever** with zero payment verification.

### Steps:
1. Go to **[HuggingFace.co](https://huggingface.co)** and sign up.
2. Click **New Space** -> Space Name: `aegivex-api` -> SDK: Select **Docker** -> Blank.
3. Push the contents of the `backend/` folder into your Hugging Face Space repository.
4. Go to **Settings -> Variables and secrets** and add `DATABASE_URL`, `GROQ_API_KEY`, `OPENROUTER_API_KEY`, and `JWT_SECRET`.
5. Hugging Face will automatically run your FastAPI Docker container!

---

## 💻 FRONTEND DEPLOYMENT: Deploy Next.js to Vercel (100% Free)

1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)** -> Click **Add New...** -> **Project**.
2. Select your GitHub repository (`Aegivex-AI`).
3. Set **Root Directory**: `frontend`.
4. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL + `/api/v1` (e.g. `https://aegivex-api.vercel.app/api/v1` or `https://aegivex-api.koyeb.app/api/v1`)
   - `NEXT_PUBLIC_APP_NAME`: `Aegivex AI`
5. Click **Deploy**.

---

## 🗄️ Database Status: Neon PostgreSQL (100% Connected & Seeded)

Your cloud database is already 100% configured and seeded:
- **Connection URI**: `postgresql://neondb_owner:npg_AHzFiXh8QK3m@ep-nameless-tooth-azlinshz-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
- **Admin Login**: `admin@aegivex.ai` / `AdminPassword123!`
- **User Login**: `user@aegivex.ai` / `UserPassword123!`
