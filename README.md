# ⚠️ Academic Project Disclaimer

This is a **student/academic project** created for educational purposes at **University of Ghana**.

- ❌ **NOT affiliated with Coinbase, Kraken, or any real exchange**
- ❌ **NO real transactions occur** — all data is simulated
- ❌ **DO NOT enter real personal information or passwords**
- ❌ **NO real wallet connections** — purely demo UI

This project demonstrates frontend/backend integration, JWT authentication, and database design patterns. Use for learning only.

---

# Crypto Frontend + Auth Backend

This project now includes:

- React + Vite frontend
- Node.js + Express backend
- MongoDB with Mongoose models
- JWT authentication with HTTP-only cookie support
- Email verification flow (OTP code)

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Update `.env` values:

- `MONGODB_URI`
- `JWT_SECRET`
- `VITE_API_BASE_URL` (default `http://localhost:5000`)
- Email settings (`EMAIL_TRANSPORT=console` for local testing)

4. Start everything automatically (MongoDB + backend + frontend):

```bash
npm run app
```

This starts MongoDB automatically on Windows (service or `mongod`), then runs the API and frontend.

You can also double-click `start-app.bat` on Windows.

## Auth API Endpoints

Base path: `/api/auth`

- `POST /register`
  - body: `{ "name": "John Doe", "email": "john@example.com", "password": "StrongPass1!" }`
- `POST /verify-email`
  - body: `{ "email": "john@example.com", "code": "123456" }`
- `POST /resend-verification`
  - body: `{ "email": "john@example.com" }`
- `POST /login`
  - body: `{ "email": "john@example.com", "password": "StrongPass1!" }`
- `POST /logout`

Health check:

- `GET /api/health`

## Notes

- Verification codes are hashed in the database and expire automatically.
- Login is blocked until `isEmailVerified = true`.
- In local development with `EMAIL_TRANSPORT=console`, verification codes are printed in backend logs.
- For real email delivery, set `EMAIL_TRANSPORT=smtp` and valid `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`.
