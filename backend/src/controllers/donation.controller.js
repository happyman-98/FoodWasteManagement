import * as donationService from '../services/donation.service.js'
import { sendSuccess } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

const createDonation = async (req, res, next) => {
  try {
    const images = req.files?.map((f) => f.path) ?? []
    const roleToSourceType = {
      donor: 'Individual',
      farmer: 'Farmer',
      restaurant: 'Restaurant',
    }
    const sourceType = roleToSourceType[req.user.role] || 'Individual'

    const donation = await donationService.createDonation(
      req.user.id,
      { ...req.body, sourceType },
      images
    )
    sendSuccess(res, STATUS_CODES.CREATED, 'Donation created successfully', donation)
  } catch (error) {
    next(error)
  }
}

const getMyDonations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const data = await donationService.getDonationsByDonor(req.user.id, { page, limit })
    sendSuccess(res, STATUS_CODES.OK, 'Donations fetched successfully', data)
  } catch (error) {
    next(error)
  }
}

const getAllDonations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, status, tag } = req.query
    const filters = {
      ...(category && { category }),
      ...(status   && { status }),
      ...(tag      && { tag }),
    }
    const data = await donationService.getAllDonations({ page, limit, filters })
    sendSuccess(res, STATUS_CODES.OK, 'Donations fetched successfully', data)
  } catch (error) {
    next(error)
  }
}

const getDonationById = async (req, res, next) => {
  try {
    const donation = await donationService.getDonationById(req.params.id)
    sendSuccess(res, STATUS_CODES.OK, 'Donation fetched successfully', donation)
  } catch (error) {
    next(error)
  }
}

const updateDonation = async (req, res, next) => {
  try {
    const donation = await donationService.updateDonation(req.params.id, req.user.id, req.body)
    sendSuccess(res, STATUS_CODES.OK, 'Donation updated successfully', donation)
  } catch (error) {
    next(error)
  }
}

const deleteDonation = async (req, res, next) => {
  try {
    await donationService.deleteDonation(req.params.id, req.user.id)
    sendSuccess(res, STATUS_CODES.OK, 'Donation deleted successfully')
  } catch (error) {
    next(error)
  }
}

export { createDonation, getMyDonations, getAllDonations, getDonationById, updateDonation, deleteDonation }