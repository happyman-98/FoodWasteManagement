const sendSuccess = (res, statusCode, message, data = null) => {
  const response = { success: true, message }
  if (data !== null) response.data = data
  return res.status(statusCode).json(response)
}

const sendError = (res, statusCode, message, stack = undefined) => {
  const response = { success: false, message }
  if (stack) response.stack = stack
  return res.status(statusCode).json(response)
}

const createError = (statusCode, message) => {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

export { sendSuccess, sendError, createError }