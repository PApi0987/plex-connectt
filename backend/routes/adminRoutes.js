import express from "express";
import {
  getAllUsers,
  getAllTransactions,
} from "../controllers/adminController.js";

import { adminProtect } from "../middlewares/adminAuth.js";

const router = express.Router();

router.get("/users", adminProtect, getAllUsers);
router.get("/transactions", adminProtect, getAllTransactions);

export default router;
