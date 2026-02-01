import express from 'express';
import {
  addBook,
  getAllBooks,
  getBookById,
  updatedBook,
  deleteBook,
} from '../Controllers/bookController.js';

import { protect } from '../Middleware/authMiddleware.js';
import { isLibrarian } from '../Middleware/roleMiddleware.js';

const router = express.Router();

// add new book (Librarian)
router.post("/", protect, isLibrarian, addBook);

// get all books
router.get("/", protect, isLibrarian, getAllBooks);

// get single book
router.get("/:id", protect, getBookById);

// update book
router.put("/:id", protect, isLibrarian, updatedBook);

// delete book
router.delete("/:id", protect, isLibrarian, deleteBook);

export default router;