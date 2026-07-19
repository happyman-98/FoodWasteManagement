import { sendError } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (error) {
      const message = error.details.map((d) => d.message.replace(/['"]/g, '')).join(', ')
      return sendError(res, STATUS_CODES.BAD_REQUEST, message)
    }

    next()
  }
}

export { validate }