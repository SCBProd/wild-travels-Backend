import createHttpError from 'http-errors';
import { User } from '../models/user.js';

export async function getCurrentUser(req,res){
  const { sessionId } = req.cookies;
  const user = User.findOne({sessionId});

  if(!user) {
    console.log("User could not be found ");
    throw createHttpError(404, `User not found`);
  }

  res.status(200).json(user);
  console.log("User found succesfully");
}
