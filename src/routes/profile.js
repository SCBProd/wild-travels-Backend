import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getCurrentUser } from '../controllers/profileController.js';
import { getCurrentUserSchema } from '../validations/userValidation.js';

const profileRoutes = Router();

profileRoutes.get('/profile', celebrate(getCurrentUserSchema), getCurrentUser);

export default profileRoutes;
