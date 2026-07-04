import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import storiesRoutes from './routes/stories.js';
import userRoutes from './routes/usersRoutes.js';
import profileRoutes from './routes/profile.js';
import categoryRouter from './routes/categories.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/categories', categoryRouter);

app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
