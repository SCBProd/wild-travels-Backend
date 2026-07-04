import { model, Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Category = model('Category', categorySchema, 'categories');
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'categorys',
  },
);

export const Category = mongoose.model('Category', categorySchema);

