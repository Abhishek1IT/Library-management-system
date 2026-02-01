import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../Controllers/userController.js";

import { protect } from "../Middleware/authMiddleware.js";
import { isLibrarian } from "../Middleware/roleMiddleware.js";

const router = express.Router();

// Get All users (Librarian)
router.get("/", protect, isLibrarian, getAllUsers);

// Get Single user
router.get("/:id", protect, getUserById);

//update user role (Librarian)
router.put("/:id", protect, isLibrarian, updateUser);

//delete user (Librarian)
router.delete("/:id", protect, isLibrarian, deleteUser);

export default router;
