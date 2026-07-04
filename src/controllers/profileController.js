import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { User } from '../models/user.js';

export async function getCurrentUser(req, res) {
  const { sessionId } = req.cookies;

  const user = await User.findOne({ sessionId });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
}

export async function updateAvatar(req, res) {
  const { _id } = req.user;

  if (!req.file) {
    throw createHttpError(400, 'Avatar file is required');
  }

  const avatarUrl = await saveFileToCloudinary(req.file.path);

  const user = await User.findByIdAndUpdate(
    _id,
    { avatar: avatarUrl },
    { new: true },
  );

  res.status(200).json(user);
}
