import createHttpError from "http-errors";
import { Category } from "../models/category.js";
import { Story } from "../models/story.js";
import { User } from "../models/user.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";


export const createStory = async (req, res, next) => {
  try {
    console.log("🚀 CREATE STORY START");


    if (!req.file) {
      console.log("❌ Image missing");

      throw createHttpError(
        400,
        "Image is required"
      );
    }


    console.log("📷 File received:", {
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
    });


    console.log("☁️ Uploading image...");

    const result = await saveFileToCloudinary(
      req.file.buffer
    );


    console.log("✅ Image uploaded:", result.secure_url);


    req.body.img = result.secure_url;



    console.log("🔎 Finding category:", req.body.category);


    const categoryDoc = await Category.findOne({
      category: req.body.category,
    });


    if (!categoryDoc) {
      console.log(
        "❌ Category not found:",
        req.body.category
      );

      throw createHttpError(
        404,
        "Category not found"
      );
    }


    console.log("✅ Category found:", {
      id: categoryDoc._id,
      category: categoryDoc.category,
    });



    console.log("👤 Current user:", req.user);



    console.log("📝 Creating story...");


    const story = await Story.create({
      ...req.body,
      ownerId: req.user._id,
      category: categoryDoc._id,
    });


    console.log("✅ Story created:", {
      id: story._id,
    });



    console.log("👤 Updating user counter...");


    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $inc: {
          articlesAmount: 1,
        },
      },
      {
        new: true,
      }
    );


    if (!user) {
      console.log(
        "⚠️ User not found:",
        req.user._id
      );
    } else {
      console.log("✅ User updated:", {
        id: user._id,
        articlesAmount: user.articlesAmount,
      });
    }



    console.log("📦 Populating category...");


    const populatedStory = await story.populate(
      "category"
    );


    console.log("🎉 STORY CREATED SUCCESS:", {
      id: populatedStory._id,
    });



    return res
      .status(201)
      .json(populatedStory);



  } catch (error) {

    console.error(
      "🔥 CREATE STORY ERROR:",
      error
    );


    next(error);
  }
};
