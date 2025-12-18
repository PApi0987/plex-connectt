// routes/userRoutes.js
import express from 'express';
import { registerUser, getUsers } from '../controllers/userController.js';

const router = express.Router();

// Register
router.post('/register', registerUser);

// List users
router.get('/', getUsers);

export default router;
