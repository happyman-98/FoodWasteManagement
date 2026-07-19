import Joi from 'joi'

const createDonationSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().max(1000).required(),
category: Joi.string().valid('Food', 'Produce', 'Clothing', 'Medicine', 'Books', 'Electronics', 'Household Items').required(),
  quantity: Joi.string().trim().required(),
  location: Joi.string().trim().required(),
  expiresAt: Joi.date().greater('now').required(),
  image: Joi.string().uri().optional(),
  tag: Joi.string().valid('Urgent', 'Fresh', 'New', 'Popular', 'Verified', 'Available').default('New'),
})

const updateDonationSchema = Joi.object({
  title:       Joi.string().trim().min(3).max(100).optional(),
  description: Joi.string().trim().max(1000).optional(),
category: Joi.string().valid('Food', 'Produce', 'Clothing', 'Medicine', 'Books', 'Electronics', 'Household Items').optional(),
  quantity:    Joi.string().trim().optional(),
  location:    Joi.string().trim().optional(),
  expiresAt:   Joi.date().greater('now').optional(),
  image:       Joi.string().uri().optional(),
  tag:         Joi.string().valid('Urgent', 'Fresh', 'New', 'Popular', 'Verified', 'Available').optional(),
  status:      Joi.string().valid('Active', 'Picked Up', 'Delivered', 'Cancelled').optional(),
}).min(1).messages({ 'object.min': 'At least one field must be provided to update' })

export { createDonationSchema, updateDonationSchema }