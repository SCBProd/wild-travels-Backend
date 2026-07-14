import createHttpError from "http-errors";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { User } from "../models/user.js";

export async function getCurrentUser(req, res) {
  const user = req.user.toObject();

  res.status(200).json(user);
}

export async function updateAvatar(req, res) {
  const { file, user } = req;
  if (!req.file) {
    throw createHttpError(400, "No File");
  }

  const result = await saveFileToCloudinary(file.buffer, user._id);

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { avatarUrl: result.secure_url },
    { returnDocument: "after" }
  );
  res.status(200).json({ url: updatedUser.avatarUrl });
}
