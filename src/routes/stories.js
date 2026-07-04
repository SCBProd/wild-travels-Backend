import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getStoryByIdSchema } from '../validations/storyValidation.js';
import { getStoryById } from '../controllers/storyController.js';

const storiesRoutes = Router();

storiesRoutes.get('/:storyId', celebrate(getStoryByIdSchema), getStoryById);

export default storiesRoutes;
