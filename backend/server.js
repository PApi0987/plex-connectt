import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import vtuRoutes from './routes/vtuRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ROUTES
app.use('/api/vtu', vtuRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// ROOT TEST ROUTE
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Plex Connect Backend is live!' });
});

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
