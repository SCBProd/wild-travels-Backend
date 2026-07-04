import { User } from '../models/user.js';
import { Story } from '../models/story.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  const {
    perPage = 10,
    page = 1,
    category,
    search,
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const skip = (pageNumber - 1) * perPageNumber;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const storiesQuery = Story.find({
    ownerId: new mongoose.Types.ObjectId(userId),
  });

  if (category) {
    storiesQuery.where('category').equals(category);
  }

  if (search) {
    storiesQuery.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { article: { $regex: search, $options: 'i' } },
      ],
    });
  }

  const [totalStories, stories] = await Promise.all([
    storiesQuery.clone().countDocuments(),
    storiesQuery
      .skip(skip)
      .limit(perPageNumber)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(totalStories / perPageNumber);
  res.status(200).json({
    user,
    stories,
    page: pageNumber,
    perPage: perPageNumber,
    totalStories,
    totalPages,
  });
};

// export const getUserStories = (req, res) = {

// }
