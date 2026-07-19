import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Food', 'Produce', 'Clothing', 'Medicine', 'Books', 'Electronics', 'Household Items'],
    },
    sourceType: {
      type: String,
      enum: ['Individual', 'Farmer', 'Restaurant', 'NGO'],
      default: 'Individual',
    },
    quantity: {
      type: String,
      required: [true, 'Quantity is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    image: {
      type: [String],
      default: [],
    },
    tag: {
      type: String,
      enum: ['Urgent', 'Fresh', 'New', 'Popular', 'Verified', 'Available'],
      default: 'New',
    },
  status: {
  type: String,
  enum: ['Active', 'Requested', 'Picked Up', 'Delivered', 'Cancelled'],
  default: 'Active',
},
    expiresAt: {
      type: Date,
      required: [true, 'Expiry date is required'],
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Donor is required'],
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

postSchema.index({ donor: 1 })
postSchema.index({ status: 1 })
postSchema.index({ category: 1 })
postSchema.index({ sourceType: 1 })
postSchema.index({ expiresAt: 1 })

postSchema.methods.toJSON = function () {
  const post = this.toObject()
  delete post.__v
  return post
}

const Post = mongoose.model('Post', postSchema)

export default Post