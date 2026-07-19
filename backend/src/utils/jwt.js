import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.js'

const generateAccessToken = (payload) => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN })
}

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, { expiresIn: ENV.JWT_REFRESH_EXPIRES_IN })
}

const verifyAccessToken = (token) => {
  return jwt.verify(token, ENV.JWT_SECRET)
}

const verifyRefreshToken = (token) => {
  return jwt.verify(token, ENV.JWT_REFRESH_SECRET)
}

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken }