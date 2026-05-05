import dotenv from 'dotenv'

dotenv.config()

const parseNumber = (value, fallback) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseNumber(process.env.PORT, 5000),
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  mongodbUri: process.env.MONGODB_URI ?? '',
  jwtSecret: process.env.JWT_SECRET ?? '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  authCookieName: process.env.AUTH_COOKIE_NAME ?? 'auth_token',
  verificationCodeExpiresMinutes: parseNumber(process.env.VERIFICATION_CODE_EXPIRES_MINUTES, 10),
  verificationCodeResendCooldownSeconds: parseNumber(process.env.VERIFICATION_CODE_RESEND_COOLDOWN_SECONDS, 60),
  emailTransport: process.env.EMAIL_TRANSPORT ?? 'console',
  emailFrom: process.env.EMAIL_FROM ?? '',
  smtpHost: process.env.SMTP_HOST ?? '',
  smtpPort: parseNumber(process.env.SMTP_PORT, 587),
  smtpUser: process.env.SMTP_USER ?? '',
  smtpPass: process.env.SMTP_PASS ?? '',
}

const missingBaseVariables = []

if (!env.mongodbUri) {
  missingBaseVariables.push('MONGODB_URI')
}

if (!env.jwtSecret) {
  missingBaseVariables.push('JWT_SECRET')
}

if (missingBaseVariables.length > 0) {
  throw new Error(`Missing required environment variables: ${missingBaseVariables.join(', ')}`)
}

if (env.emailTransport === 'smtp') {
  const missingSmtpVariables = []

  if (!env.smtpHost) {
    missingSmtpVariables.push('SMTP_HOST')
  }

  if (!env.smtpUser) {
    missingSmtpVariables.push('SMTP_USER')
  }

  if (!env.smtpPass) {
    missingSmtpVariables.push('SMTP_PASS')
  }

  if (missingSmtpVariables.length > 0) {
    throw new Error(`Missing SMTP environment variables: ${missingSmtpVariables.join(', ')}`)
  }
}

export { env }
