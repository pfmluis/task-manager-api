import Joi from 'joi';

export default function userLoginValidator(loginData) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),
  })

  const { error } = schema.validate(loginData)

  return Object.freeze({ isValid: !error, error })
}