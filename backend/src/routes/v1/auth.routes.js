import { Router } from 'express'
import { 
  register, 
  login, 
  logout, 
  refreshToken, 
  forgotPassword, 
  resetPassword 
} from '../../controllers/auth.controller.js'

import { verifyToken } from '../../middlewares/auth.middleware.js'
import { validate } from '../../middlewares/validate.middleware.js'
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../../validators/auth.validator.js'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/refresh-token', refreshToken)
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword)
router.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword)

router.post('/logout', verifyToken, logout)

export default router