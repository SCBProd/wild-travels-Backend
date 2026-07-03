// src/models/User.js

import mongoose from 'mongoose';
import { emailRegex } from '../constants/emailRegex.js';

const userSchema = new mongoose.Schema(
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
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// прибираємо пароль з відповіді API
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// захист від OverwriteModelError (ВАЖЛИВО)
export const User =
  mongoose.models.User || mongoose.model('User', userSchema);
