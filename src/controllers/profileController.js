// src\controllers\profileController.js

import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { User } from '../models/user.js';

export const getCurrentUser = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Unauthorized');
  }

  res.status(200).json(req.user);
};

export const updateAvatar = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Unauthorized');
  }

  if (!req.file) {
    throw createHttpError(400, 'Avatar is required');
  }

  const result = await saveFileToCloudinary(
    req.file.buffer,
    req.user.id,
  );

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      avatar: result.secure_url,
    },
    {
      new: true,
    },
  );

  res.status(200).json({
    message: 'Avatar updated successfully',
    avatar: user.avatar,
  });
};
