import createHttpError from "http-errors";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { User } from "../models/user.js";

export async function getCurrentUser(req, res) {
  const user = req.user.toObject();

  res.status(200).json(user);
}


export async function updateAvatar(req, res, next) {
  try {
    const { user } = req;

    if (!req.file) {
      throw createHttpError(400, "No File");
    }

    const result = await saveFileToCloudinary(
      req.file.buffer,
      user._id
    );

    if (!result || !result.secure_url) {
      throw createHttpError(
        500,
        "Cloudinary upload failed"
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        avatarUrl: result.secure_url,
      },
      {
        returnDocument: "after",
      }
    );

    if (!updatedUser) {
      throw createHttpError(
        404,
        "User not found"
      );
    }

    res.status(200).json({
      url: updatedUser.avatarUrl,
    });

  } catch (error) {
    next(error);
  }
}
