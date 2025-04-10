import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
};

const capitaliseFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export { hashPassword, comparePasswords, capitaliseFirstLetter };
