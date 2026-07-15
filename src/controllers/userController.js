import { User } from "../models/user.js";
import { Story } from "../models/story.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getUsers = async (req, res) => {
  const {
    perPage = 10,
    page = 1,
    sortBy = "articlesAmount",
    sortOrder = "asc",
  } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const skip = (pageNumber - 1) * perPageNumber;
  const usersQuery = User.find()
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(perPageNumber);
  const [users, totalUsers] = await Promise.all([
    usersQuery,
    User.countDocuments(),
  ]);
  const usersWithArticles = await Promise.all(
    users.map(async (user) => {
      const articlesAmount = await Story.countDocuments({
        ownerId: user._id,
      });

      return {
        ...user.toObject(),
        articlesAmount,
      };
    }),
  );

  const totalPages = Math.ceil(totalUsers / perPageNumber);
  res.status(200).json({
    users: usersWithArticles,
    page: pageNumber,
    perPage: perPageNumber,
    totalUsers,
    totalPages,
  });
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  const {
    perPage = 10,
    page = 1,
    category,
    search,
    sortBy = "_id",
    sortOrder = "asc",
  } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const skip = (pageNumber - 1) * perPageNumber;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const storiesQuery = Story.find({
    ownerId: new mongoose.Types.ObjectId(userId),
  });

  if (category) {
    storiesQuery.where("category").equals(category);
  }

  if (search) {
    storiesQuery.where({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { article: { $regex: search, $options: "i" } },
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

export const addSavedArticle = async (req, res) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    throw createHttpError(400, "Invalid article id");
  }

  const story = await Story.findById(articleId);

  if (!story) {
    throw createHttpError(404, "Article not found");
  }

  const user = await User.findOneAndUpdate(
    {
      _id: req.user._id,
      savedArticles: { $ne: articleId },
    },
    {
      $addToSet: {
        savedArticles: articleId,
      },
    },
    {
      returnDocument: "after",
    },
  );

  if (!user) {
    throw createHttpError(409, "Article already saved");
  }
  await Story.findByIdAndUpdate(articleId, {
    $inc: {
      savedCount: 1,
    },
  });
  res.status(201).json({
    message: "Article added to saved articles",
    savedArticles: user.savedArticles,
  });
};

export const removeSavedArticle = async (req, res) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    throw createHttpError(400, "Invalid article id");
  }

  const user = await User.findOneAndUpdate(
    {
      _id: req.user._id,
      savedArticles: articleId,
    },
    {
      $pull: {
        savedArticles: articleId,
      },
    },
    {
      returnDocument: "after",
    },
  );

  if (!user) {
    throw createHttpError(404, "Article is not in saved articles");
  }
  const story = await Story.findById(articleId);

  if (story.savedCount > 0) {
    await Story.findByIdAndUpdate(articleId, {
      $inc: {
        savedCount: -1,
      },
    });
  }
  res.status(200).json({
    message: "Article removed from saved articles",
    savedArticles: user.savedArticles,
  });
};
