import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Routes
import vtuRoutes from './routes/vtuRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/vtu', vtuRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Plex Connect Backend is live 🚀'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
