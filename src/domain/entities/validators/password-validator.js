import Joi from 'joi';

export default function passwordValidator(password) {
  const schema = Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*/)
    .messages({
      'string.pattern' :'Password must contain a between 8 and 50 characters, and at least one number and one symbol'
    })

  const { error } = schema.validate(password)

  return Object.freeze({ isValid: !error, error })
}