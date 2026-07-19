import User from '../models/user.model.js'
import { createError } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

const getAllUsers = async ({ page = 1, limit = 10, filters = {} }) => {
  const skip = (Number(page) - 1) * Number(limit)

  const [users, total] = await Promise.all([
    User.find(filters).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
    User.countDocuments(filters),
  ])

  return {
    users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  }
}

const getUserById = async (id) => {
  const user = await User.findById(id)

  if (!user) {
    throw createError(STATUS_CODES.NOT_FOUND, 'User not found')
  }

  return user
}

const updateUserById = async (id, updates) => {
  const forbiddenFields = ['password', 'role', 'email', 'refreshToken', 'status']
  forbiddenFields.forEach((field) => delete updates[field])

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    throw createError(STATUS_CODES.NOT_FOUND, 'User not found')
  }

  return user
}

const deleteUserById = async (id) => {
  const user = await User.findByIdAndDelete(id)

  if (!user) {
    throw createError(STATUS_CODES.NOT_FOUND, 'User not found')
  }

  return true
}

export { getAllUsers, getUserById, updateUserById, deleteUserById }