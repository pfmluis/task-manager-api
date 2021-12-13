import Joi from 'joi';

export default function userFromTokenValidator(user) {
  const schema = Joi.object({
    sid: Joi.string()
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required(),
    role: Joi.string()
      .max(25)
      .required(),
    permissions: Joi
      .array()
      .required()
  })

  const { error } = schema.validate(user)

  return Object.freeze({ isValid: !error, error })
}