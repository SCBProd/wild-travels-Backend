import HttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('error', err.message);

  if (err instanceof HttpError) {
    return res.tatus(err.status).json({
      message: errorHandler.message || err.name,
    });
  }

  const isProduction = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProduction
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
};
