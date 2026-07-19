import { Router } from 'express'
import {
  createDonation,
  getMyDonations,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
} from '../../controllers/donation.controller.js'
import { verifyToken, authorizeRoles } from '../../middlewares/auth.middleware.js'
import { validate } from '../../middlewares/validate.middleware.js'
import { createDonationSchema, updateDonationSchema } from '../../validators/donation.validator.js'
import { uploadPhotos } from '../../middlewares/upload.middleware.js'

const router = Router()

router.get('/', getAllDonations)

router.get('/my',   verifyToken, getMyDonations)
router.get('/:id',  verifyToken, getDonationById)

router.post('/',     verifyToken, authorizeRoles('donor', 'restaurant', 'farmer'), uploadPhotos, validate(createDonationSchema), createDonation)
router.patch('/:id', verifyToken, validate(updateDonationSchema), updateDonation)
router.delete('/:id', verifyToken, deleteDonation)

export default router