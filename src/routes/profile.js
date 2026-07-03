import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getCurrentUser } from '../controllers/profileController';
import { getCurrentUserSchema } from '../validations/userValidation';



const router = Router();

router.get('/profile',celebrate(getCurrentUserSchema),getCurrentUser);

