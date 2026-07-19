import winston from 'winston'
import { ENV } from './env.js'

const { combine, timestamp, colorize, printf, json, errors } = winston.format

const devFormat = printf(({ level, message, timestamp, stack }) => {
  const ts = timestamp.replace('T', ' ').replace('Z', '')
  const prefix = `[${ts}] ${level.toUpperCase().padEnd(5)}`
  return stack ? `${prefix} ${message}\n${stack}` : `${prefix} ${message}`
})

const transports = []

if (ENV.IS_DEV || ENV.IS_TEST) {
  transports.push(
    new winston.transports.Console({
      format: combine(colorize({ all: true }), timestamp(), errors({ stack: true }), devFormat),
    })
  )
} else {
  transports.push(
    new winston.transports.Console({
      format: combine(timestamp(), errors({ stack: true }), json()),
    })
  )

  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(timestamp(), errors({ stack: true }), json()),
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    })
  )

  transports.push(
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: combine(timestamp(), json()),
      maxsize: 10 * 1024 * 1024,
      maxFiles: 10,
    })
  )
}

const logger = winston.createLogger({
  level: ENV.LOG_LEVEL ?? 'info',
  transports,
  silent: ENV.IS_TEST,
  exitOnError: false,
})

export default logger