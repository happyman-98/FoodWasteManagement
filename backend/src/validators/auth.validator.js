import Joi from 'joi'

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().email().lowercase().required(),
  password: Joi.string().min(6).max(100).required(),
  role: Joi.string().valid('donor', 'restaurant', 'farmer', 'ngo').required(),
  phone: Joi.string().trim().min(7).max(15).optional(),
  city: Joi.string().trim().allow('').optional(),
  licenseNumber: Joi.string().trim().allow(null, '').when('role', {
    is: Joi.valid('ngo', 'restaurant'),
    then: Joi.string().trim().required().messages({
      'any.required': 'License/registration number is required for this account type',
    }),
    otherwise: Joi.optional(),
  }),
  agreed: Joi.boolean().valid(true).required().messages({
    'any.only': 'You must agree to the terms and conditions',
  }),
})

const loginSchema = Joi.object({
  email: Joi.string().trim().email().lowercase().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('donor', 'restaurant', 'farmer', 'ngo', 'admin').optional(),
})

const forgotPasswordSchema = Joi.object({
  email: Joi.string().trim().email().lowercase().required(),
})

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).max(100).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),
})

export { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema }