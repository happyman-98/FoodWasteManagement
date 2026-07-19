import * as ngoService from '../services/ngo.service.js'
import { sendSuccess } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

const getNgoStats = async (req, res, next) => {
  try {
    const stats = await ngoService.getNgoStats(req.user.id)
    sendSuccess(res, STATUS_CODES.OK, 'Stats fetched successfully', stats)
  } catch (error) {
    next(error)
  }
}

const getSavedDonations = async (req, res, next) => {
  try {
    const saved = await ngoService.getSavedDonations(req.user.id)
    sendSuccess(res, STATUS_CODES.OK, 'Saved donations fetched successfully', { saved })
  } catch (error) {
    next(error)
  }
}

const saveDonation = async (req, res, next) => {
  try {
    await ngoService.saveDonation(req.user.id, req.params.id)
    sendSuccess(res, STATUS_CODES.OK, 'Donation saved successfully')
  } catch (error) {
    next(error)
  }
}

const removeSavedDonation = async (req, res, next) => {
  try {
    await ngoService.removeSavedDonation(req.user.id, req.params.id)
    sendSuccess(res, STATUS_CODES.OK, 'Donation removed from saved')
  } catch (error) {
    next(error)
  }
}

const requestPickup = async (req, res, next) => {
  try {
    const pickup = await ngoService.requestPickup(req.user.id, req.params.id)
    sendSuccess(res, STATUS_CODES.CREATED, 'Pickup requested successfully', pickup)
  } catch (error) {
    next(error)
  }
}

const getPickupRequests = async (req, res, next) => {
  try {
    const pickups = await ngoService.getPickupRequests(req.user.id)
    sendSuccess(res, STATUS_CODES.OK, 'Pickup requests fetched successfully', { pickups })
  } catch (error) {
    next(error)
  }
}

export { getNgoStats, getSavedDonations, saveDonation, removeSavedDonation, requestPickup, getPickupRequests }