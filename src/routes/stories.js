import { Router } from 'express';
import { celebrate } from 'celebrate';

import { getStories, getStoryById } from '../controllers/storyController.js';

import {
  getStoriesSchema,
  getStoryByIdSchema,
} from '../validations/storyValidation.js';

const storiesRoutes = Router();

storiesRoutes.get('/', celebrate(getStoriesSchema), getStories);

storiesRoutes.get('/:storyId', celebrate(getStoryByIdSchema), getStoryById);

export default storiesRoutes;
