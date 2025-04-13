import { Request, RequestHandler, Response } from 'express';
import { asyncCatch } from '../utils/asyncCatch';
import httpStatus from 'http-status';
import { UserService, userService } from '../services/userService';
import { UserRequest } from '../utils/types';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

type CreateUserControllerDeps = {
  userService: UserService;
  asyncCatch: <T extends (...args: any[]) => Promise<any>>(
    fn: T
  ) => RequestHandler;
};

export const createUserController = ({
  userService,
  asyncCatch,
}: CreateUserControllerDeps) => ({
  registerUser: asyncCatch(async (req: Request, res: Response) => {
    const data: UserRequest = req.body;

    try {
      await userService.registerUser(data);
      res
        .status(httpStatus.CREATED)
        .send({ message: 'User created successfully' });
    } catch (error: any) {
      if (error.message === 'Email already taken') {
        return res.status(httpStatus.BAD_REQUEST).send({
          message: 'Email is already taken. Please use a different email.',
        });
      }
      console.error('Error:', error);
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error' });
    }
  }),

  login: asyncCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await userService.login(email, password);
      const tokens = {
        accessToken: generateAccessToken({
          userId: user.userId,
          email: user.email,
          role: user.role,
        }),
        refreshToken: generateRefreshToken({
          userId: user.userId,
          email: user.email,
          role: user.role,
        }),
      };
      res.status(httpStatus.OK).json(tokens);
    } catch (error: any) {
      res.status(httpStatus.UNAUTHORIZED).json({ error: error.message });
    }
  }),

  refreshToken: asyncCatch(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    const newAccessToken = generateAccessToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
    });

    res.json({ accessToken: newAccessToken });
  }),

  getUserProfile: asyncCatch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const profile = await userService.getProfile(id);
    if (!profile) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'User not found' });
    }
    res.status(httpStatus.OK).json(profile);
  }),

  changePassword: asyncCatch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
      await userService.changePassword(id, oldPassword, newPassword);
      res
        .status(httpStatus.OK)
        .json({ message: 'Password changed successfully' });
    } catch (error: any) {
      res.status(httpStatus.BAD_REQUEST).json({
        message: error.message || 'Unable to reset password',
      });
    }
  }),
});

export const userController = createUserController({
  userService,
  asyncCatch,
});
