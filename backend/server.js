import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Routes
import vtuRoutes from './routes/vtuRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

/* ======================
   MIDDLEWARES
====================== */
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/* ======================
   ROUTES
====================== */

// Base test route
app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: '🚀 Plex Connect Backend is LIVE'
  });
});

// User routes
app.use('/api/users', userRoutes);

// VTU routes (data, airtime, cable, electricity)
app.use('/api/vtu', vtuRoutes);

// Admin routes (protected by ADMIN_API_KEY)
app.use('/api/admin', adminRoutes);

/* ======================
   ERROR HANDLING
====================== */

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ ERROR:', err.stack);
  res.status(500).json({
    status: false,
    message: 'Internal server error',
    error: err.message
  });
});

/* ======================
   SERVER
====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
