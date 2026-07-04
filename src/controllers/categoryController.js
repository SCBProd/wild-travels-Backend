import { Category } from '../models/category.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().lean();

    return res.status(200).json({
      status: 200,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};
