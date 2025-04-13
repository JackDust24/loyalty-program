import { userRepository } from '../repositories/userRepository';
import { hashPassword, comparePasswords } from '../utils/helpers';
import { UserRequest, UserInsert, UserGet } from '../utils/types';

type UserServiceDependencies = {
  userRepo: typeof userRepository;
  crypto: {
    randomUUID: () => string;
  };
  hashUtil: {
    hash: (password: string) => Promise<string>;
    compare: (plainText: string, hash: string) => Promise<boolean>;
  };
};

export const createUserService = (deps: UserServiceDependencies) => ({
  registerUser: async (userData: UserRequest): Promise<void> => {
    const hashedPassword = await deps.hashUtil.hash(userData.password);
    const user: UserInsert = {
      user_id: crypto.randomUUID(),
      email: userData.email,
      password_hash: hashedPassword,
      is_active: true,
    };

    await deps.userRepo.saveUser(user);
  },

  login: async (email: string, password: string) => {
    const user = await deps.userRepo.findUserByEmail(email);

    const isPasswordValid = await deps.hashUtil.compare(
      password,
      user.password_hash
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const roleName = user.user_roles[0]?.roles?.name || 'user';

    return {
      userId: user.user_id,
      email: user.email,
      role: roleName,
    };
  },

  getProfile: async (id: string): Promise<UserGet | null> => {
    const user = await deps.userRepo.findUserById(id);
    if (!user) return null;

    return {
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      is_active: user.is_active,
      user_id: user.user_id,
    };
  },

  changePassword: async (
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
    await deps.userRepo.changePassword(id, oldPassword, newPassword);
  },
});

export const userService = createUserService({
  userRepo: userRepository,
  crypto: { randomUUID: () => crypto.randomUUID() },
  hashUtil: { hash: hashPassword, compare: comparePasswords },
});

export type UserService = ReturnType<typeof createUserService>;
