import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchem,
  registerUserSchema,
} from '../validations/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
const authRoutes = Router();

authRoutes.post('/register', celebrate(registerUserSchema), registerUser);

authRoutes.post('/login', celebrate(loginUserSchem), loginUser);

authRoutes.post('/logout', logoutUser); ///authindicate

authRoutes.post('/refresh', refreshUserSession);

export default authRoutes;
