import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app.js'
import Crypto from './models/Crypto.js'
import defaultCryptos from './data/defaultCryptos.js'

dotenv.config()

const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'FRONTEND_URL']
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key])

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
  process.exit(1)
}

const PORT = Number(process.env.PORT) || 5000

const seedDefaultCryptos = async () => {
  const bulkOps = defaultCryptos.map((crypto) => ({
    updateOne: {
      filter: { symbol: crypto.symbol },
      update: { $set: crypto },
      upsert: true,
    },
  }))

  if (bulkOps.length > 0) {
    await Crypto.bulkWrite(bulkOps)
    console.log(`Seeded ${bulkOps.length} default cryptocurrencies`)
  }
}

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    await seedDefaultCryptos()

    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })

    const gracefulShutdown = async (signal) => {
      console.log(`${signal} received, shutting down...`)
      await mongoose.connection.close()
      server.close(() => {
        process.exit(0)
      })
    }

    process.on('SIGINT', () => {
      void gracefulShutdown('SIGINT')
    })

    process.on('SIGTERM', () => {
      void gracefulShutdown('SIGTERM')
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

void startServer()
