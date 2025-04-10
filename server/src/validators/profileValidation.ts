import Joi from 'joi';
import { password } from './passwordValidation';

const createUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().custom(password).messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'string.base': 'Old password must be a string',
    'any.required': 'Old password is required',
  }),
  newPassword: Joi.string().required().custom(password).messages({
    'string.base': 'New password must be a string',
    'any.required': 'New password is required',
  }),
});

export { createUserSchema, changePasswordSchema };
