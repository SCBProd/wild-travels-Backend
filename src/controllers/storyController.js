import createHttpError from "http-errors";
import mongoose from "mongoose";
import { Category } from "../models/category.js";
import { Story } from "../models/story.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { calculatePaginationData } from "../utils/pagination.js";

export const createStory = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, "Image is required");
  }

  const result = await saveFileToCloudinary(req.file.buffer);
  req.body.img = result.secure_url;

  const categoryDoc = await Category.findOne({ category: req.body.category });
  if (!categoryDoc) {
    throw createHttpError(404, "Category not found");
  }

  const story = await (
    await Story.create({
      ...req.body,
      ownerId: req.user._id,
      category: categoryDoc._id,
    })
  ).populate("category");

  await User.findByIdAndUpdate(req.user._id, {
    $inc: { articlesAmount: 1 },
  });

  res.status(201).json(story);
};

export const getRecommendedStoriesController = async (req, res, next) => {
  try {
    const { category, page = 1, perPage = 10 } = req.query;

    if (!category) {
      return res
        .status(400)
        .json({ message: "Category query parameter is required" });
    }

    const limit = parseInt(perPage);
    const skip = (parseInt(page) - 1) * limit;

    const categoryObjectId = new mongoose.Types.ObjectId(category);

    const stories = await Story.aggregate([
      { $match: { category: categoryObjectId } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "savedArticles",
          as: "savedByUsers",
        },
      },
      {
        $addFields: {
          countSaves: { $size: "$savedByUsers" },
        },
      },
      { $sort: { countSaves: -1, createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      { $project: { savedByUsers: 0 } },
    ]);

    const totalItems = await Story.countDocuments({
      category: categoryObjectId,
    });

    res.status(200).json({
      status: 200,
      message: "Successfully found recommended stories!",
      data: {
        stories,
        page: parseInt(page),
        perPage: limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStories = async (req, res, next) => {
  try {
    const { page = 1, perPage = 12, category, type } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    const { skip, limit } = calculatePaginationData(page, perPage);

    const sort =
      type === "popular"
        ? { savedCount: -1, createdAt: -1 }
        : { createdAt: -1 };

    const [stories, totalItems] = await Promise.all([
      Story.find(filter)
        .populate("category")
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
    storyQuery.skip(skip).limit(Number(perPage)).sort({ createdAt: -1 }),
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
    throw createHttpError(404, "Story not found");
  }

  res.status(200).json(story);
};

export const getStoryById = async (req, res) => {
  const { storyId } = req.params;
  const story = await Story.findById(storyId);
  if (!story) {
    throw createHttpError(404, "Story not found");
  }
  res.status(200).json(story);
};
