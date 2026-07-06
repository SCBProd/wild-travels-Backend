import { celebrate } from 'celebrate';
import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUsersSchema,
  getUserByIdSchema,
  removeSavedArticleSchema,
} from '../validations/userValidation.js';
import {
  getUsers,
  getUserById,
  removeSavedArticle,
} from '../controllers/userController.js';

const userRoutes = Router();

userRoutes.get('/', celebrate(getUsersSchema), getUsers);
userRoutes.get('/:userId', celebrate(getUserByIdSchema), getUserById);

userRoutes.delete(
  '/savedArticles/:articleId',
  authenticate,
  celebrate(removeSavedArticleSchema),
  removeSavedArticle,
);

export default userRoutes;
