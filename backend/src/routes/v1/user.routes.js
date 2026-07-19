import { Router } from 'express'
import {
  getMe,
  updateMe,
  deleteMe,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updateAvatar
} from '../../controllers/user.controller.js'
import { verifyToken, authorizeRoles } from '../../middlewares/auth.middleware.js'
import { validate } from '../../middlewares/validate.middleware.js'
import { updateUserSchema } from '../../validators/user.validator.js'
import { uploadAvatar } from '../../middlewares/upload.middleware.js'

const router = Router()

router.use(verifyToken)

router.get('/me', getMe)
router.patch('/me', validate(updateUserSchema), updateMe)
router.delete('/me', deleteMe)
router.patch('/avatar', uploadAvatar, updateAvatar)

router.get('/', authorizeRoles('admin'), getAllUsers)
router.get('/:id', authorizeRoles('admin'), getUserById)
router.patch('/:id', authorizeRoles('admin'), validate(updateUserSchema), updateUserById)
router.delete('/:id', authorizeRoles('admin'), deleteUserById)

export default router