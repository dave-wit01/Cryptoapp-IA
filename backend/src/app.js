import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import cryptoRoutes from './routes/cryptoRoutes.js'
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js'

const app = express()
const explicitOrigins = (process.env.FRONTEND_URL ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const isLocalDevOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true)
        return
      }

      if (explicitOrigins.includes(origin) || isLocalDevOrigin(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  }),
)

app.use(express.json())
app.use(cookieParser())

app.get('/health', (_req, res) => {
  return res.status(200).json({
    success: true,
    message: 'API is running',
  })
})

app.use('/', authRoutes)
app.use('/crypto', cryptoRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
