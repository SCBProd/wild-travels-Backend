import { model, Schema } from 'mongoose';
import { emailRegex } from '../constants/emailRegex.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: true,
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: 'https://api.dicebear.com/10.x/glyphs/svg?seed=1ufyhxau',
    },
    articlesAmount: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    savedArticles: {
      type: [Schema.Types.ObjectId],
      ref: 'Story',
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
