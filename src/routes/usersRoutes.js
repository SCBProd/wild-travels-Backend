import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getUserByIdSchema } from '../validations/userValidation.js';
import { getUserById } from '../controllers/userController.js';

const userRoutes = Router();

userRoutes.get('/:userId', celebrate(getUserByIdSchema), getUserById);

export default userRoutes;
