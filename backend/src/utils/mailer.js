import nodemailer from 'nodemailer'
import { env } from '../config/env.js'

let cachedTransporter = null

const getTransporter = () => {
  if (cachedTransporter) {
    return cachedTransporter
  }

  cachedTransporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpPort === 465,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass,
    },
  })

  return cachedTransporter
}

const sendVerificationCodeEmail = async ({ to, name, code }) => {
  if (env.emailTransport !== 'smtp') {
    console.log(`[EMAIL MOCK] to=${to} code=${code}`)
    return
  }

  const transporter = getTransporter()

  const subject = 'Verify your email address'
  const safeName = name?.trim() || 'there'
  const text = `Hi ${safeName}, your verification code is ${code}. It expires in ${env.verificationCodeExpiresMinutes} minutes.`
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <p>Hi ${safeName},</p>
      <p>Your verification code is:</p>
      <p style="font-size: 24px; font-weight: 700; letter-spacing: 4px;">${code}</p>
      <p>This code expires in ${env.verificationCodeExpiresMinutes} minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
  `

  await transporter.sendMail({
    from: env.emailFrom || env.smtpUser,
    to,
    subject,
    text,
    html,
  })
}

export { sendVerificationCodeEmail }
