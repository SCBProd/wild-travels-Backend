import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  createStory,
  getStories,
  getStoryById,
} from '../controllers/storyController.js';
import {
  createStorySchema,
  getStoriesSchema,
  getStoryByIdSchema,
} from '../validations/storyValidation.js';
import { upload } from '../middleware/multer.js';
import { authenticate } from '../middleware/authenticate.js';

const storiesRoutes = Router();

storiesRoutes.get('/', celebrate(getStoriesSchema), getStories);
storiesRoutes.post('/', authenticate, upload.single('img'), celebrate(createStorySchema), createStory);
storiesRoutes.get('/:storyId', celebrate(getStoryByIdSchema), getStoryById);

export default storiesRoutes;
