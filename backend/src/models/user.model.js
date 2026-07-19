import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { ENV } from '../config/env.js'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['donor', 'restaurant', 'farmer', 'ngo', 'admin'],
      required: [true, 'Role is required'],
    },
    city: {
       type: String,
    default: "" 
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    refreshToken: {
      type: String,
      select: false,
      default: null,
    },
    passwordResetToken: {
      type: String,
      select: false,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
      default: null,
    },
      savedDonations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
licenseNumber: {
  type: String,
  trim: true,
  default: null,
  required: [
    function () { return ['ngo', 'restaurant'].includes(this.role) },
    'License/registration number is required for this account type',
  ],
},
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const saltRounds = Number(ENV.BCRYPT_SALT_ROUNDS) || 10
  this.password = await bcrypt.hash(this.password, saltRounds)
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  delete user.refreshToken
  delete user.passwordResetToken
  delete user.passwordResetExpires
  delete user.__v
  return user
}

const User = mongoose.model('User', userSchema)

export default User