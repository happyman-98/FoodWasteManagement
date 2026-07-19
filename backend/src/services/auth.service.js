import crypto from 'crypto'
import User from '../models/user.model.js'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.js'
import { createError } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

const register = async ({ name, email, password, role, phone, city, licenseNumber, agreed }) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw createError(STATUS_CODES.CONFLICT, 'Email is already registered')
  }

  const user = await User.create({ name, email, password, role, phone, city, licenseNumber, agreed })

  const accessToken = generateAccessToken({ id: user._id, role: user.role })
  const refreshToken = generateRefreshToken({ id: user._id })

  user.refreshToken = refreshToken
  await user.save({ validateBeforeSave: false })

  return { user, accessToken, refreshToken }
}

const login = async ({ email, password, role }) => {
  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.comparePassword(password))) {
    throw createError(STATUS_CODES.UNAUTHORIZED, 'Invalid email or password')
  }

  if (role && user.role !== role) {
    throw createError(STATUS_CODES.FORBIDDEN, `No account found with role '${role}'`)
  }

  if (user.status === 'Inactive') {
    throw createError(STATUS_CODES.FORBIDDEN, 'Your account has been deactivated')
  }

  const accessToken = generateAccessToken({ id: user._id, role: user.role })
  const refreshToken = generateRefreshToken({ id: user._id })

  user.refreshToken = refreshToken
  await user.save({ validateBeforeSave: false })

  return { user, accessToken, refreshToken }
}

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null })
}

const refreshToken = async (token) => {
  if (!token) {
    throw createError(STATUS_CODES.UNAUTHORIZED, 'Refresh token is required')
  }

  const decoded = verifyRefreshToken(token)

  const user = await User.findById(decoded.id).select('+refreshToken')

  if (!user || user.refreshToken !== token) {
    throw createError(STATUS_CODES.UNAUTHORIZED, 'Invalid or expired refresh token')
  }

  const accessToken = generateAccessToken({ id: user._id, role: user.role })
  const newRefreshToken = generateRefreshToken({ id: user._id })

  user.refreshToken = newRefreshToken
  await user.save({ validateBeforeSave: false })

  return { accessToken, refreshToken: newRefreshToken }
}

const forgotPassword = async (email) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw createError(STATUS_CODES.NOT_FOUND, 'No account found with that email')
  }

  const resetToken = crypto.randomBytes(32).toString('hex')
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  user.passwordResetToken = hashedToken
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000
  await user.save({ validateBeforeSave: false })

  // TODO: send email with resetToken
  // await sendResetEmail(user.email, resetToken)

  return resetToken
}

const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select('+password')

  if (!user) {
    throw createError(STATUS_CODES.BAD_REQUEST, 'Reset token is invalid or has expired')
  }

  user.password = newPassword
  user.passwordResetToken = null
  user.passwordResetExpires = null
  user.refreshToken = null
  await user.save()

  return true
}

export { register, login, logout, refreshToken, forgotPassword, resetPassword }