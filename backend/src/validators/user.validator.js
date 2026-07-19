import Joi from 'joi'

const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).optional(),
  phone: Joi.string().trim().min(7).max(15).optional(),
  city: Joi.string().trim().optional(),
  avatar: Joi.string().uri().optional(),
  status: Joi.string().valid('Active', 'Inactive').optional(),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided to update',
  })

export { updateUserSchema }