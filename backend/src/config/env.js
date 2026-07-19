import 'dotenv/config'

const required = (key) => {
  const value = process.env[key]
  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value.trim()
}

const optional = (key, defaultValue) => {
  const value = process.env[key]
  return value && value.trim() !== '' ? value.trim() : defaultValue
}

const num = (key, defaultValue) => {
  const raw = process.env[key]
  if (!raw && defaultValue !== undefined) return defaultValue
  const parsed = Number(raw)
  if (isNaN(parsed)) throw new Error(`Environment variable ${key} must be a number, got: "${raw}"`)
  return parsed
}

const ENV = {
  NODE_ENV:     optional('NODE_ENV', 'development'),
  PORT:         num('PORT', 5000),
  CLIENT_URL:   optional('CLIENT_URL', 'http://localhost:3000'),

  MONGO_URI:    required('MONGO_URI'),

  JWT_SECRET:             required('JWT_SECRET'),
  JWT_EXPIRES_IN:         optional('JWT_EXPIRES_IN', '7d'),
  JWT_REFRESH_SECRET:     required('JWT_REFRESH_SECRET'),
  JWT_REFRESH_EXPIRES_IN: optional('JWT_REFRESH_EXPIRES_IN', '30d'),

  BCRYPT_SALT_ROUNDS: num('BCRYPT_SALT_ROUNDS', 12),

  LOG_LEVEL: optional('LOG_LEVEL', 'info'),

  EMAIL_HOST: optional('EMAIL_HOST', ''),
  EMAIL_PORT: num('EMAIL_PORT', 587),
  EMAIL_USER: optional('EMAIL_USER', ''),
  EMAIL_PASS: optional('EMAIL_PASS', ''),
  EMAIL_FROM: optional('EMAIL_FROM', ''),

  CLOUDINARY_CLOUD_NAME: optional('CLOUDINARY_CLOUD_NAME', ''),
  CLOUDINARY_API_KEY:    optional('CLOUDINARY_API_KEY', ''),
  CLOUDINARY_API_SECRET: optional('CLOUDINARY_API_SECRET', ''),
}

ENV.IS_DEV  = ENV.NODE_ENV === 'development'
ENV.IS_PROD = ENV.NODE_ENV === 'production'
ENV.IS_TEST = ENV.NODE_ENV === 'test'

const validateEnv = () => {
  const REQUIRED_VARS = ['MONGO_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET']

  const missing = REQUIRED_VARS.filter((key) => !process.env[key]?.trim())

  if (missing.length > 0) {
    throw new Error(
      `Server startup aborted. Missing required .env variables:\n  → ${missing.join('\n  → ')}`
    )
  }

  if (ENV.IS_DEV) {
    console.log('\n⚙️  Environment Config')
    console.log(`  NODE_ENV : ${ENV.NODE_ENV}`)
    console.log(`  PORT     : ${ENV.PORT}`)
    console.log(`  MONGO_URI: ${ENV.MONGO_URI.replace(/\/\/.*@/, '//****:****@')}`)
    console.log(`  LOG_LEVEL: ${ENV.LOG_LEVEL}`)
    console.log(`  CLIENT   : ${ENV.CLIENT_URL}\n`)
  }
}

export { ENV, validateEnv }