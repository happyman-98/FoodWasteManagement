import Post from '../models/post.model.js'
import User from '../models/user.model.js'
import { createError } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

// NOTE: field names below (donor, status, category, quantity, ngo, createdAt)
// are assumed to match your Post schema — rename as needed to fit it.

const startOfMonthsAgo = (n) => {
  const d = new Date()
  d.setMonth(d.getMonth() - n)
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d
}

const getRestaurantOverview = async (restaurantId) => {
  const restaurant = await User.findById(restaurantId)
  if (!restaurant || restaurant.role !== 'restaurant') {
    throw createError(STATUS_CODES.NOT_FOUND, 'Restaurant not found')
  }

  const sixMonthsAgo = startOfMonthsAgo(5) // current month + 5 previous

  const [
    mealsDonatedAgg,
    mealsLastMonthAgg,
    mealsPrevMonthAgg,
    activeListings,
    listingsExpiringSoon,
    ngosThisMonth,
    co2Agg,
    monthlyAgg,
    recentListings,
  ] = await Promise.all([
    Post.countDocuments({ donor: restaurantId }),

    Post.countDocuments({
      donor: restaurantId,
      createdAt: { $gte: startOfMonthsAgo(0) },
    }),

    Post.countDocuments({
      donor: restaurantId,
      createdAt: { $gte: startOfMonthsAgo(1), $lt: startOfMonthsAgo(0) },
    }),

    Post.countDocuments({ donor: restaurantId, status: 'Active' }),

    Post.countDocuments({
      donor: restaurantId,
      status: 'Active',
      expiresAt: { $lte: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    }),

    Post.distinct('ngo', {
      donor: restaurantId,
      status: 'Delivered',
      createdAt: { $gte: startOfMonthsAgo(0) },
    }),

    Post.aggregate([
      { $match: { donor: restaurant._id, status: 'Delivered' } },
      { $group: { _id: null, totalCo2: { $sum: '$co2SavedKg' } } },
    ]),

    Post.aggregate([
      { $match: { donor: restaurant._id, createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          meals: { $sum: '$quantity' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]),

    Post.find({ donor: restaurantId })
      .sort({ createdAt: -1 })
      .limit(4)
      .select('title quantity status'),
  ])

  const mealsDonatedChangePct = mealsPrevMonthAgg
    ? Math.round(((mealsLastMonthAgg - mealsPrevMonthAgg) / mealsPrevMonthAgg) * 100)
    : mealsLastMonthAgg > 0 ? 100 : 0

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return {
    restaurantName: restaurant.name,
    location: restaurant.location || null,
    isVerified: restaurant.status === 'Active',
    isActiveDonor: mealsDonatedAgg > 0,
    stats: {
      mealsDonated: mealsDonatedAgg,
      mealsDonatedChangePct,
      activeListings,
      listingsExpiringSoon,
      ngosServedThisMonth: ngosThisMonth.length,
      co2SavedKgLifetime: co2Agg[0]?.totalCo2 || 0,
    },
    monthlyDonations: monthlyAgg.map((m) => ({
      month: monthNames[m._id.month - 1],
      meals: m.meals,
    })),
    recentListings: recentListings.map((l) => ({
      id: l._id,
      name: l.title,
      quantityLabel: `${l.quantity} pcs`,
      status: l.status,
    })),
  }
}

export { getRestaurantOverview }