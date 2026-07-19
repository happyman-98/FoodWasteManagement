import mongoose from 'mongoose'

const pickupSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'picked_up', 'delivered', 'cancelled'],
      default: 'active',
    },
  },
  { timestamps: true }
)

pickupSchema.index({ ngo: 1 })
pickupSchema.index({ donation: 1 })

const Pickup = mongoose.model('Pickup', pickupSchema)
export default Pickup