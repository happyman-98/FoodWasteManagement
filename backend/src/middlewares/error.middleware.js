import { STATUS_CODES } from '../constants/statusCodes.js'
import logger from '../config/logger.js'
import { ENV } from '../config/env.js'

const errorMiddleware = (err, req, res, next) => {
  console.error("--- DETAILED ERROR STACK TRACE ---", err);
  let statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR
  let message = err.message || 'Something went wrong'

  if (err.name === 'CastError') {
    statusCode = STATUS_CODES.BAD_REQUEST
    message = `Invalid ${err.path}: ${err.value}`
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    statusCode = STATUS_CODES.CONFLICT
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
  }

  if (err.name === 'ValidationError') {
    statusCode = STATUS_CODES.BAD_REQUEST
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ')
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = STATUS_CODES.UNAUTHORIZED
    message = 'Invalid token'
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = STATUS_CODES.UNAUTHORIZED
    message = 'Token expired'
  }

  logger.error(`[${req.method}] ${req.originalUrl} → ${statusCode} : ${message}`)

  return res.status(statusCode).json({
    success: false,
    message,
    ...(ENV.IS_DEV && { stack: err.stack })
  })
}

export default errorMiddleware