import { Router } from 'express';
import { userController } from '../controllers/userController';

import { verifyToken } from '../middlewares/authMiddleware';
import {
  createUserSchema,
  changePasswordSchema,
} from '../validators/profileValidation';
import { validateRequest } from '../middlewares/validateRoutes';

const router = Router();

router.post(
  '/register',
  validateRequest(createUserSchema),
  userController.registerUser
);
router.get('/user/:id', verifyToken, userController.getUserProfile);
router.post(
  '/change-password/:id',
  verifyToken,
  validateRequest(changePasswordSchema),
  userController.changePassword
);

export default router;

// User login
