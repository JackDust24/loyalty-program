import validator from 'validator';

export const password = (value: string, helpers: any) => {
  if (
    !validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return helpers.message(
      'Password should be at least 8 characters long, with one uppercase letter, one lowercase letter, one number, and one special character.'
    );
  }
  return value;
};
