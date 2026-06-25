import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// =====================
// BASE MIDDLEWARE
// =====================
app.use(logger);
app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

// =====================
// ROUTES
// =====================
app.use('/api/notes', notesRoutes);
app.use('/api/auth', authRoutes);

// =====================
// 404 HANDLER
// =====================
app.use(notFoundHandler);

// =====================
// CELEBRATE ERRORS
// =====================
app.use(errors());

// =====================
// GLOBAL ERROR HANDLER
// =====================
app.use(errorHandler);

// =====================
// START SERVER
// =====================
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
