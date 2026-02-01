import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';

import  connectDB  from './config/db.js';
import {config}  from './config/env.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

import './jobs/reminderNotifier.js';


// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import plantRoutes from './routes/plantRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import diseaseRoutes from './routes/diseaseRoutes.js';
import growthRoutes from './routes/growthRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import gardenRoutes from './routes/gardenRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import waterRoutes from './routes/waterRoutes.js';
import encyclopedia from './routes/encyclopedia.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// DB connection
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static folder for image uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/disease', diseaseRoutes);
app.use('/api/growth', growthRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/garden', gardenRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/encyclopedia', encyclopedia);

// Health check route
app.get('/', (req, res) => {
  res.send('🌿 Green Guide 2.0 API is running');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running in ${config.env} mode on port ${PORT}`);
});
