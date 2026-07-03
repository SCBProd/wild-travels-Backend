import * as storyService from '../services/storyService.js';
import createHttpError from 'http-errors';

export const getStoryById = async (req, res, next) => {
  try {
    const { storyId } = req.params;

    const story = await storyService.getStoryById(storyId);

    if (!story) {
      throw createHttpError(404, 'Така історія відсутня');
    }

    return res.status(200).json(story);
  } catch (error) {
    next(error);
  }
};
