import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nutrivibe')
  .then(() => console.log('✅ MongoDB connected — NutriVibe AI is ready!'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/user', userRoutes);

app.get('/health', (req, res) => res.json({ status: 'OK', app: 'NutriVibe AI', version: '2.0' }));

app.listen(PORT, () => console.log(`🚀 NutriVibe AI Server running on http://localhost:${PORT}`));
