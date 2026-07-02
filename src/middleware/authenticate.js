import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  const { sessionId, accessToken } = req.cookies;

  if (!sessionId || !accessToken) {
    throw createHttpError(401, 'Missing session credential');
  }

  const session = await Session.findOne({
    _id: sessionId,
    accessToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isAccessTokenExpired = session.accessTokenValidUntil < new Date();
  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  req.user = user;
  next();
};
