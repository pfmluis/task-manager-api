import Joi from 'joi';

export default function userValidator(user) {
  const schema = Joi.object({
    sid: Joi.string()
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required(),
    name: Joi.string()
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    hash: Joi.string()
      .optional(),
    role: Joi.string()
      .max(25)
      .required(),
    permissions: Joi.array()
      .required(),
    createdAt: Joi.date()
      .optional(),
    updatedAt: Joi.date()
      .optional()
  })

  const { error } = schema.validate(user)

  return Object.freeze({ isValid: !error, error })
}