import Post from '../models/post.model.js'
import { createError } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

const createDonation = async (donorId, body, images = []) => {
  const donation = await Post.create({ ...body, donor: donorId, image: images })
  return donation
}

const getDonationsByDonor = async (donorId, { page = 1, limit = 10 }) => {
  const skip = (Number(page) - 1) * Number(limit)

  const [donations, total] = await Promise.all([
    Post.find({ donor: donorId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Post.countDocuments({ donor: donorId }),
  ])

  return {
    donations,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  }
}

const getAllDonations = async ({ page = 1, limit = 10, filters = {} }) => {
  const skip = (Number(page) - 1) * Number(limit)

  const query = { status: 'Active', ...filters }

  const [donations, total] = await Promise.all([
    Post.find(query)
      .populate('donor', 'name email avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Post.countDocuments(query),
  ])

  return {
    donations,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  }
}

const getDonationById = async (id) => {
  const donation = await Post.findById(id).populate('donor', 'name email avatar')
  if (!donation) throw createError(STATUS_CODES.NOT_FOUND, 'Donation not found')
  return donation
}

const updateDonation = async (id, userId, updates) => {
  const donation = await Post.findById(id)
  if (!donation) throw createError(STATUS_CODES.NOT_FOUND, 'Donation not found')

  if (donation.donor.toString() !== userId.toString()) {
    throw createError(STATUS_CODES.FORBIDDEN, 'You are not authorized to update this donation')
  }

  const forbidden = ['donor', 'claimedBy']
  forbidden.forEach((f) => delete updates[f])

  Object.assign(donation, updates)
  await donation.save()

  return donation
}

const deleteDonation = async (id, userId) => {
  const donation = await Post.findById(id)
  if (!donation) throw createError(STATUS_CODES.NOT_FOUND, 'Donation not found')

  if (donation.donor.toString() !== userId.toString()) {
    throw createError(STATUS_CODES.FORBIDDEN, 'You are not authorized to delete this donation')
  }

  await donation.deleteOne()
  return true
}

export { createDonation, getDonationsByDonor, getAllDonations, getDonationById, updateDonation, deleteDonation }