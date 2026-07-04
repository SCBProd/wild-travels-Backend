import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'categorys',
  },
);

export const Category = mongoose.model('Category', categorySchema);
