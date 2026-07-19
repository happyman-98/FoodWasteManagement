import Post from '../models/post.model.js'
import User from '../models/user.model.js'
import Pickup from '../models/pickup.model.js'
import { createError } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

const getNgoStats = async (ngoId) => {
  const [pickupsThisMonth, savedListings, activeRequests] = await Promise.all([
    Pickup.countDocuments({
      ngo: ngoId,
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
    }),
    User.findById(ngoId).select('savedDonations').then((u) => u?.savedDonations?.length || 0),
    Pickup.countDocuments({ ngo: ngoId, status: 'active' }),
  ])

  return {
    pickupsThisMonth,
    savedListings,
    activeRequests,
    peopleServed: pickupsThisMonth * 27,
  }
}

const getSavedDonations = async (ngoId) => {
  const user = await User.findById(ngoId).populate({
    path: 'savedDonations',
    populate: { path: 'donor', select: 'name' },
  })
  return user?.savedDonations || []
}

const saveDonation = async (ngoId, donationId) => {
  const donation = await Post.findById(donationId)
  if (!donation) throw createError(STATUS_CODES.NOT_FOUND, 'Donation not found')

  await User.findByIdAndUpdate(ngoId, { $addToSet: { savedDonations: donationId } })
  return true
}

const removeSavedDonation = async (ngoId, donationId) => {
  await User.findByIdAndUpdate(ngoId, { $pull: { savedDonations: donationId } })
  return true
}

const requestPickup = async (ngoId, donationId) => {
  const donation = await Post.findById(donationId)
  if (!donation) throw createError(STATUS_CODES.NOT_FOUND, 'Donation not found')
  if (donation.status !== 'Active') throw createError(STATUS_CODES.CONFLICT, 'Donation is no longer available')

  const existing = await Pickup.findOne({ ngo: ngoId, donation: donationId })
  if (existing) throw createError(STATUS_CODES.CONFLICT, 'You already requested this donation')

  const pickup = await Pickup.create({ ngo: ngoId, donation: donationId, donor: donation.donor, status: 'active' })
  await Post.findByIdAndUpdate(donationId, { status: 'Picked Up', claimedBy: ngoId })

  return pickup
}

const getPickupRequests = async (ngoId) => {
  return Pickup.find({ ngo: ngoId })
    .populate('donation', 'title category')
    .populate('donor', 'name')
    .sort({ createdAt: -1 })
}

export { getNgoStats, getSavedDonations, saveDonation, removeSavedDonation, requestPickup, getPickupRequests }