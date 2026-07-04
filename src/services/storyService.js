import { Story } from '../models/story.js';

export const getStoryById = async (storyId) => {
  return await Story.findById(storyId);
};
