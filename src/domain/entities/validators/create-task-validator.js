import Joi from 'joi';

export default function createTaskValidator(task) {
  const schema = Joi.object({
    executedAt: Joi.date()
      .required(),
    summary: Joi.string()
      .min(1)
      .max(2500)
      .required(),
  })

  const { error } = schema.validate(task)

  return Object.freeze({ isValid: !error, error })
}

