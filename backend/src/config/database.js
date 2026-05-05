import mongoose from 'mongoose'
import { env } from './env.js'

const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)
  await mongoose.connect(env.mongodbUri)
  console.log('MongoDB connected')
}

export { connectToDatabase }
