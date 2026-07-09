import { celebrate } from 'celebrate';
import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUsersSchema,
  getUserByIdSchema,
  addSavedArticleSchema,
  removeSavedArticleSchema,
} from '../validations/userValidation.js';
import {
  getUsers,
  getUserById,
  addSavedArticle,
  removeSavedArticle,
} from '../controllers/userController.js';

const userRoutes = Router();

userRoutes.get('/', celebrate(getUsersSchema), getUsers);
userRoutes.get('/:userId', celebrate(getUserByIdSchema), getUserById);

userRoutes.post(
  '/savedArticles/:articleId', //users/stories/:articleId/saved
  authenticate,
  celebrate(addSavedArticleSchema),
  addSavedArticle,
);

userRoutes.delete(
  '/savedArticles/:articleId', // taksamo /saved/delete
  authenticate,
  celebrate(removeSavedArticleSchema),
  removeSavedArticle,
);

export default userRoutes;
