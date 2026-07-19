import * as authService from '../services/auth.service.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body)
    sendSuccess(res, STATUS_CODES.CREATED, 'Account created successfully', data)
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body)
    sendSuccess(res, STATUS_CODES.OK, 'Logged in successfully', data)
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id)
    sendSuccess(res, STATUS_CODES.OK, 'Logged out successfully')
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    const data = await authService.refreshToken(refreshToken)
    sendSuccess(res, STATUS_CODES.OK, 'Token refreshed successfully', data)
  } catch (error) {
    next(error)
  }
}

const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email)
    sendSuccess(res, STATUS_CODES.OK, 'Password reset link sent to your email')
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.params.token, req.body.password)
    sendSuccess(res, STATUS_CODES.OK, 'Password reset successfully')
  } catch (error) {
    next(error)
  }
}

export { register, login, logout, refreshToken, forgotPassword, resetPassword }