import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
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
      ref: 'story',
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

export const User = model('user', userSchema);
