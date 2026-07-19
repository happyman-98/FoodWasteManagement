import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { ENV } from './config/env.js'
import logger from './config/logger.js'
import routes from './routes/index.js'
import errorMiddleware from './middlewares/error.middleware.js'
import { cloudinaryCleanup } from './middlewares/cloudinaryCleanup.middleware.js'

const app = express()

app.use(helmet())

app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true,
}))

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

if (ENV.IS_DEV) {
  app.use(morgan('dev'))
}

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' })
})

app.use('/api', routes)

app.all('/*splat', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
})

app.use(cloudinaryCleanup)
app.use(errorMiddleware)

export default app