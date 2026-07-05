import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Story } from '../models/story.js';

export const getSavedStories = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const currentUser = await User.findById(req.user._id).lean();

    if (!currentUser) {
      throw createHttpError(404, 'User not found');
    }

    const total = currentUser.savedArticles.length;
    const totalPages = Math.ceil(total / limit);

    if (total === 0) {
      return res.status(200).json({
        status: 200,
        message: 'Saved stories not found',
        data: [],
        page,
        limit,
        total: 0,
        totalPages: 0,
      });
    }

    const paginatedIds = currentUser.savedArticles.slice(skip, skip + limit);

    const stories = await Story.find({
      _id: { $in: paginatedIds },
    });

    const storiesInSavedOrder = paginatedIds
      .map((id) => stories.find((story) => story._id.toString() === id.toString()))
      .filter(Boolean);

    res.status(200).json({
      status: 200,
      message: 'Successfully found saved stories!',
      data: storiesInSavedOrder,
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};