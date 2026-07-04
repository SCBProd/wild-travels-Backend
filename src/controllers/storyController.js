import createHttpError from 'http-errors';
import { Story } from '../models/story.js';
import { calculatePaginationData } from '../utils/pagination.js';

export const getStories = async (req, res, next) => {
  try {
    const { page = 1, perPage = 12, category, type } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    const { skip, limit } = calculatePaginationData(page, perPage);

    const sort =
      type === 'popular'
        ? { savedCount: -1, createdAt: -1 }
        : { createdAt: -1 };

    const [stories, totalItems] = await Promise.all([
      Story.find(filter)
        .populate('category')
        .sort(sort)
        .skip(skip)
        .limit(limit),

      Story.countDocuments(filter),
    ]);

    res.status(200).json({
      data: stories,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages: Math.ceil(totalItems / Number(perPage)),
    });
  } catch (error) {
    next(error);
  }
};

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
    totalPages: Math.ceil(totalItems / Number(perPage)),
    stories,
  });
};

export const getOwnStoryById = async (req, res) => {
  const { storyId } = req.params;

  const story = await Story.findOne({
    _id: storyId,
    ownerId: req.user._id,
  });

  if (!story) {
    throw createHttpError(404, 'Story not found');
  }

  res.status(200).json(story);
};
