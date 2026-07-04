import createHttpError from 'http-errors';
import { Story } from '../models/story.js';

export const getOwnStories = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;

  const skip = (page - 1) * perPage;

  const storyQuery = Story.find({
    ownerId: req.user._id,
  });

  const [totalItems, stories] = await Promise.all([
    storyQuery.clone().countDocuments(),
    storyQuery
      .skip(skip)
      .limit(Number(perPage))
      .sort({ createdAt: -1 }),
  ]);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
    stories,
  });
};
export const getOwnStoriByID = async (req, res) => {
  const { storyId } = req.params;
  const story = await Story.findOne({
    _id: storyId,
    ownerId: req.user._id,
  });
  if (!story) {
    throw createHttpError(404, ' Story not found');
  }
  res.status(200).json(story);
};
