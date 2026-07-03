
import { Router } from 'express';
import { getCurrentUser , updateAvatar } from '../controllers/profileController.js';
import { authenticate } from '../middleware/authenticate.js';
import {upload} from '../middleware/multer.js';

const profileRoutes = Router();
profileRoutes.get('/current', authenticate, getCurrentUser);
profileRoutes.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  updateAvatar
);



export default profileRoutes;





