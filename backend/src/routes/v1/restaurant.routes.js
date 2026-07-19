import { Router } from 'express'
import { getOverview } from '../../controllers/restaurant.controller.js'
import { verifyToken, authorizeRoles } from '../../middlewares/auth.middleware.js'

const router = Router()

router.use(verifyToken)

router.get('/:id/overview', authorizeRoles('restaurant', 'admin'), getOverview)

export default router