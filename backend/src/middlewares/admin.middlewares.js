import { sendError } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return sendError(res, STATUS_CODES.FORBIDDEN, 'Admin access required')
  }
  next()
}

export { requireAdmin }