import * as restaurantService from '../services/restaurant.services.js'
import { sendSuccess } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

const getOverview = async (req, res, next) => {
  try {
    const overview = await restaurantService.getRestaurantOverview(req.params.id)
    sendSuccess(res, STATUS_CODES.OK, 'Restaurant overview fetched successfully', { overview })
  } catch (error) {
    next(error)
  }
}

export { getOverview }