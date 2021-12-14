import Joi from 'joi';

export default function taskValidator(task) {
  const schema = Joi.object({
    sid: Joi.string()
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required(),
    executedAt: Joi.date()
      .required(),
    summary: Joi.string()
      .min(1)
      .required(),
    executedBy: Joi.string()
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  })

  const { error } = schema.validate(task)

  return Object.freeze({ isValid: !error, error })
}