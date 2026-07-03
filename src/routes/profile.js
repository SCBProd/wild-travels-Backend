import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getCurrentUser } from '../controllers/profileController';
import { getCurrentUserSchema } from '../validations/userValidation';



const profileRoutes = Router();

profileRoutes.get('/profile',celebrate(getCurrentUserSchema),getCurrentUser);

export default profileRoutes;

