import { Router } from 'express';
import { userController } from '../controllers/userController';
import { verifyToken, handleRefreshToken } from '../middlewares/authMiddleware';
import {
  createUserSchema,
  changePasswordSchema,
  loginSchema,
} from '../validators/profileValidation';
import { validateRequest } from '../middlewares/validateRoutes';

const router = Router();

router.post(
  '/register',
  validateRequest(createUserSchema),
  userController.registerUser
);

router.post('/login', validateRequest(loginSchema), userController.login);

router.post('/refresh-token', handleRefreshToken, userController.refreshToken);

router.get('/user/:id', verifyToken, userController.getUserProfile);

router.post(
  '/change-password/:id',
  verifyToken,
  validateRequest(changePasswordSchema),
  userController.changePassword
);

export default router;
