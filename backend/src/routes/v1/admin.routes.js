import { Router } from 'express'
import {
  getStats,
  getUsers,
  updateUser,
  deleteUser,
  getDonations,
  deleteDonation,
  getNgos,
  getRestaurants,
  getReports,
  getSettings,
  updateSettings,
} from '../../controllers/admin.controller.js'
import { verifyToken, authorizeRoles } from '../../middlewares/auth.middleware.js'

const router = Router()

router.use(verifyToken, authorizeRoles('admin'))

router.get('/stats', getStats)

router.get('/users', getUsers)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

router.get('/donations', getDonations)
router.delete('/donations/:id', deleteDonation)

router.get('/ngos', getNgos)
router.get('/restaurants', getRestaurants)

router.get('/reports', getReports)

router.get('/settings', getSettings)
router.put('/settings', updateSettings)

export default router