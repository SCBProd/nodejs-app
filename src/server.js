import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// middleware
app.use(logger);
app.use(express.json({ limit: '100kb' }));
app.use(cors());

// routes
app.use(notesRoutes);

// 404
app.use(notFoundHandler);

// celebrate validation errors
app.use(errors());

// global error handler
app.use(errorHandler);

// DB + server start
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
