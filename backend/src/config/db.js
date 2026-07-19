import mongoose from 'mongoose'
import { ENV } from './env.js'
import logger from './logger.js'

let isConnected = false

const MONGO_OPTIONS = {
  maxPoolSize: 10,
  minPoolSize: 2,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 10000,
  heartbeatFrequencyMS: 10000,
  bufferCommands: false,
}

const connectDB = async () => {
  if (isConnected) {
    logger.info('MongoDB: already connected, reusing existing connection')
    return
  }

  try {
    logger.info('MongoDB: connecting to Atlas…')
    const conn = await mongoose.connect(ENV.MONGO_URI, MONGO_OPTIONS)
    isConnected = true
    logger.info(`MongoDB: connected → ${conn.connection.host}`)
  } catch (error) {
    logger.error(`MongoDB: connection failed → ${error.message}`)
    process.exit(1)
  }
}

mongoose.connection.on('connected', () => {
  isConnected = true
  logger.info('MongoDB: connection established')
})

mongoose.connection.on('disconnected', () => {
  isConnected = false
  logger.warn('MongoDB: connection lost')
})

mongoose.connection.on('reconnected', () => {
  isConnected = true
  logger.info('MongoDB: reconnected successfully')
})

mongoose.connection.on('error', (err) => {
  isConnected = false
  logger.error(`MongoDB: connection error → ${err.message}`)
})

const disconnectDB = async () => {
  if (!isConnected) return

  try {
    await mongoose.connection.close()
    isConnected = false
    logger.info('MongoDB: connection closed gracefully')
  } catch (error) {
    logger.error(`MongoDB: error during disconnect → ${error.message}`)
  }
}

process.on('SIGINT', async () => {
  await disconnectDB()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await disconnectDB()
  process.exit(0)
})

export { connectDB, disconnectDB }
export default connectDB