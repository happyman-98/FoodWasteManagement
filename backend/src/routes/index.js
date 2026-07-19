import { Router } from 'express'
import authRoutes       from './v1/auth.routes.js'
import userRoutes       from './v1/user.routes.js'
import donationRoutes   from './v1/donation.routes.js'
import ngoRoutes        from './v1/ngo.routes.js'
import adminRoutes      from './v1/admin.routes.js'
import restaurantRoutes from './v1/restaurant.routes.js'

const router = Router()

router.use('/v1/auth',       authRoutes)
router.use('/v1/users',      userRoutes)
router.use('/v1/donations',  donationRoutes)
router.use('/v1/ngo',        ngoRoutes)
router.use('/v1/admin',      adminRoutes)
router.use('/v1/restaurant', restaurantRoutes)

export default router