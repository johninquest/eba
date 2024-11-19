// src/app.js
import express from 'express';
import passport from 'passport';
// import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { setupPassport } from './config/passport.js';
import authRoutes from './routes/auth.js'; 
import userRoutes from './routes/users.js';

dotenv.config();

const app = express(); 
const port = process.env.PORT;

// Middleware
app.use(express.json());

// Setup passport
setupPassport();
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes); 
app.use('/users', userRoutes); 

// Basic health check
app.get('/', (req, res) => {
  res.json({ status: `Server is running on port => ${port}` }); 
});

// Connect to MongoDB
/* mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err)); */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});