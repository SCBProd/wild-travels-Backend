import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

import {
  createStory,
  getStories,
  getStoryById,
} from '../controllers/storyController.js';
import { getSavedStories } from '../controllers/storiesController.js';

import {
  createStorySchema,
  getStoriesSchema,
  getStoryByIdSchema,
} from '../validations/storyValidation.js';

const storiesRoutes = Router();

storiesRoutes.get('/saved', authenticate, getSavedStories);
storiesRoutes.get('/', celebrate(getStoriesSchema), getStories);

storiesRoutes.post('/', authenticate, upload.single('img'), celebrate(createStorySchema), createStory);
storiesRoutes.get('/:storyId', celebrate(getStoryByIdSchema), getStoryById);

export default storiesRoutes;