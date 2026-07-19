import { validateEnv, ENV } from './config/env.js'
import logger from './config/logger.js'
import connectDB from './config/db.js'
import app from './app.js'

validateEnv()

await connectDB()

const server = app.listen(ENV.PORT, () => {
  logger.info(`Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`)
})

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`)
  server.close(() => process.exit(1))
})

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`)
  server.close(() => process.exit(1))
})