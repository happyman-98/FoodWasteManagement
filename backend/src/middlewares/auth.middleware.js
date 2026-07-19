import { verifyAccessToken } from '../utils/jwt.js'
import { sendError } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'
import User from '../models/user.model.js'

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, STATUS_CODES.UNAUTHORIZED, 'Access token missing or malformed')
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyAccessToken(token)

    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return sendError(res, STATUS_CODES.UNAUTHORIZED, 'User no longer exists')
    }

    if (user.status === 'Inactive') {
      return sendError(res, STATUS_CODES.FORBIDDEN, 'Your account has been deactivated')
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, STATUS_CODES.UNAUTHORIZED, 'Access token expired')
    }
    if (error.name === 'JsonWebTokenError') {
      return sendError(res, STATUS_CODES.UNAUTHORIZED, 'Invalid access token')
    }
    next(error)
  }
}

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        STATUS_CODES.FORBIDDEN,
        `Role '${req.user.role}' is not authorized to access this route`
      )
    }
    next()
  }
}