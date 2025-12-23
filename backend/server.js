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

// ================= MIDDLEWARES =================
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ================= ROUTES =================
app.use('/api/vtu', vtuRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// ================= ROOT TEST ROUTE =================
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Plex Connect Backend is live!'
  });
});

// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: 'Route not found'
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
