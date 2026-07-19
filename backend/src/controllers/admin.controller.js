import User from '../models/user.model.js'
import Post from '../models/post.model.js'
import Pickup from '../models/pickup.model.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'
import { STATUS_CODES } from '../constants/statusCodes.js'

const getStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalDonors,
      totalNgos,
      totalRestaurants,
      totalDonations,
      activeDonations,
      completedPickups,
      pendingPickups,
      recentUsers,
      recentDonations,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'donor' }),
      User.countDocuments({ role: 'ngo' }),
      User.countDocuments({ role: 'restaurant' }),
      Post.countDocuments(),
      Post.countDocuments({ status: 'Active' }),
      Pickup.countDocuments({ status: 'delivered' }),
      Pickup.countDocuments({ status: 'active' }),
      User.find().sort({ createdAt: -1 }).limit(5),
      Post.find().populate('donor', 'name').sort({ createdAt: -1 }).limit(5),
    ])

    sendSuccess(res, STATUS_CODES.OK, 'Stats fetched successfully', {
      counts: {
        totalUsers,
        totalDonors,
        totalNgos,
        totalRestaurants,
        totalDonations,
        activeDonations,
        completedPickups,
        pendingPickups,
      },
      recentUsers,
      recentDonations,
    })
  } catch (error) {
    next(error)
  }
}

const getUsers = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.min(100, parseInt(req.query.limit) || 20)
    const skip  = (page - 1) * limit
    const { q, role, status } = req.query

    const filter = {}
    if (q)      filter.$or = [{ name: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }]
    if (role)   filter.role = role
    if (status) filter.status = status

    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ])

    sendSuccess(res, STATUS_CODES.OK, 'Users fetched successfully', { users, total, page, limit })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const ALLOWED = ['name', 'role', 'status', 'phone']
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => ALLOWED.includes(k))
    )

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    if (!user) return sendError(res, STATUS_CODES.NOT_FOUND, 'User not found')

    sendSuccess(res, STATUS_CODES.OK, 'User updated successfully', user)
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return sendError(res, STATUS_CODES.NOT_FOUND, 'User not found')

    await Promise.all([
      Post.deleteMany({ donor: req.params.id }),
      Pickup.deleteMany({ $or: [{ donor: req.params.id }, { ngo: req.params.id }] }),
    ])

    sendSuccess(res, STATUS_CODES.OK, 'User deleted successfully')
  } catch (error) {
    next(error)
  }
}

const getDonations = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.min(100, parseInt(req.query.limit) || 20)
    const skip  = (page - 1) * limit
    const { status, category } = req.query

    const filter = {}
    if (status)   filter.status = status
    if (category) filter.category = category

    const [donations, total, summary] = await Promise.all([
      Post.find(filter)
        .populate('donor', 'name email role')
        .populate('claimedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(filter),
      Post.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ])

    sendSuccess(res, STATUS_CODES.OK, 'Donations fetched successfully', {
      donations,
      total,
      page,
      limit,
      summary,
    })
  } catch (error) {
    next(error)
  }
}

const deleteDonation = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) return sendError(res, STATUS_CODES.NOT_FOUND, 'Donation not found')

    await Pickup.deleteMany({ donation: req.params.id })

    sendSuccess(res, STATUS_CODES.OK, 'Donation deleted successfully')
  } catch (error) {
    next(error)
  }
}

const getNgos = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.min(100, parseInt(req.query.limit) || 20)
    const skip  = (page - 1) * limit
    const { q } = req.query

    const filter = { role: 'ngo' }
    if (q) filter.$or = [{ name: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }]

    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ])

    sendSuccess(res, STATUS_CODES.OK, 'NGOs fetched successfully', { users, total })
  } catch (error) {
    next(error)
  }
}

const getRestaurants = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.min(100, parseInt(req.query.limit) || 20)
    const skip  = (page - 1) * limit
    const { q } = req.query

    const filter = { role: 'restaurant' }
    if (q) filter.$or = [{ name: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }]

    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ])

    sendSuccess(res, STATUS_CODES.OK, 'Restaurants fetched successfully', { users, total })
  } catch (error) {
    next(error)
  }
}

const getReports = async (req, res, next) => {
  try {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const [trendRaw, totalPosts, delivered, active, pickups] = await Promise.all([
      Post.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: {
              year:     { $year:  '$createdAt' },
              month:    { $month: '$createdAt' },
              category: '$category',
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]),
      Post.countDocuments(),
      Post.countDocuments({ status: 'Delivered' }),
      Post.countDocuments({ status: 'Active' }),
      Pickup.countDocuments(),
    ])

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const trendMap = {}

    trendRaw.forEach(({ _id, count }) => {
      const key = `${_id.year}-${_id.month}`
      if (!trendMap[key]) {
        trendMap[key] = {
          month: monthNames[_id.month - 1],
          foodDonations: 0,
          itemDonations: 0,
          _sort: _id.year * 100 + _id.month,
        }
      }
      if (_id.category === 'Food') {
        trendMap[key].foodDonations += count
      } else {
        trendMap[key].itemDonations += count
      }
    })

    const donationTrends = Object.values(trendMap)
      .sort((a, b) => a._sort - b._sort)
      .map(({ month, foodDonations, itemDonations }) => ({ month, foodDonations, itemDonations }))

    const summary = [
      { label: 'Total Donations', value: totalPosts },
      { label: 'Delivered',       value: delivered },
      { label: 'Active',          value: active },
      { label: 'Total Pickups',   value: pickups },
    ]

    sendSuccess(res, STATUS_CODES.OK, 'Reports fetched successfully', { donationTrends, summary })
  } catch (error) {
    next(error)
  }
}

let platformSettings = {
  platformName: 'ShareCycle',
  supportEmail: 'support@sharecycle.org',
}

const getSettings = async (req, res, next) => {
  try {
    sendSuccess(res, STATUS_CODES.OK, 'Settings fetched successfully', platformSettings)
  } catch (error) {
    next(error)
  }
}

const updateSettings = async (req, res, next) => {
  try {
    const ALLOWED = ['platformName', 'supportEmail']
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => ALLOWED.includes(k))
    )
    platformSettings = { ...platformSettings, ...updates }
    sendSuccess(res, STATUS_CODES.OK, 'Settings updated successfully', platformSettings)
  } catch (error) {
    next(error)
  }
}

export {
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
}