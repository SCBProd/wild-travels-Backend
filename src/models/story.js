import { Schema, model } from 'mongoose';

const storySchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    savedCount: {
      type: Number,
      default: 0,
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
  },

  { versionKey: false, timestamps: true },
);

export const Story = model('Story', storySchema, 'stories');
