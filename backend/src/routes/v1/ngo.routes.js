import { Router } from 'express'
import {
  getSavedDonations,
  saveDonation,
  removeSavedDonation,
  requestPickup,
  getPickupRequests,
  getNgoStats,
} from '../../controllers/ngo.controller.js'
import { verifyToken, authorizeRoles } from '../../middlewares/auth.middleware.js'

const router = Router()

router.use(verifyToken)
router.use(authorizeRoles('ngo'))

router.get('/stats',          getNgoStats)
router.get('/saved',          getSavedDonations)
router.post('/saved/:id',     saveDonation)
router.delete('/saved/:id',   removeSavedDonation)
router.get('/pickups',        getPickupRequests)
router.post('/pickups/:id',   requestPickup)

export default router