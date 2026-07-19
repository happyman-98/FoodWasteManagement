import * as userService from '../services/user.service.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

const getMe = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id)
    sendSuccess(res, STATUS_CODES.OK, 'User fetched successfully', user)
  } catch (error) {
    next(error)
  }
}

const updateMe = async (req, res, next) => {
  try {
    const user = await userService.updateUserById(req.user.id, req.body)
    sendSuccess(res, STATUS_CODES.OK, 'Profile updated successfully', user)
  } catch (error) {
    next(error)
  }
}

const deleteMe = async (req, res, next) => {
  try {
    await userService.deleteUserById(req.user.id)
    sendSuccess(res, STATUS_CODES.OK, 'Account deleted successfully')
  } catch (error) {
    next(error)
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role, status } = req.query
    const filters = { ...(role && { role }), ...(status && { status }) }
    const data = await userService.getAllUsers({ page, limit, filters })
    sendSuccess(res, STATUS_CODES.OK, 'Users fetched successfully', data)
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id)
    sendSuccess(res, STATUS_CODES.OK, 'User fetched successfully', user)
  } catch (error) {
    next(error)
  }
}

const updateUserById = async (req, res, next) => {
  try {
    const user = await userService.updateUserById(req.params.id, req.body)
    sendSuccess(res, STATUS_CODES.OK, 'User updated successfully', user)
  } catch (error) {
    next(error)
  }
}

const deleteUserById = async (req, res, next) => {
  try {
    await userService.deleteUserById(req.params.id)
    sendSuccess(res, STATUS_CODES.OK, 'User deleted successfully')
  } catch (error) {
    next(error)
  }
}
const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, STATUS_CODES.BAD_REQUEST, 'No file uploaded')
    }
    const avatarUrl = req.file.path // Cloudinary secure URL
    const user = await userService.updateUserById(req.user.id, { avatar: avatarUrl })
    sendSuccess(res, STATUS_CODES.OK, 'Avatar updated successfully', user)
  } catch (error) {
    next(error)
  }
}

export { getMe, updateMe, deleteMe, getAllUsers, getUserById, updateUserById, deleteUserById, updateAvatar }
