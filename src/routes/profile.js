import { Router } from 'express';
import {
  getCurrentUser,
  updateAvatar,
} from '../controllers/profileController.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import { getOwnStories } from '../controllers/storyController.js';

const profileRoutes = Router();
profileRoutes.get('/', authenticate, getCurrentUser);
profileRoutes.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  updateAvatar,
);
profileRoutes.get('/stories', authenticate, getOwnStories);

export default profileRoutes;
