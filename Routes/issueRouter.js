import express from 'express';
import { 
    issueBook,
    returnBook,
    getAllBooksIssued,
    getIssueBookById
} from "../Controllers/issueController.js";

import { protect } from "../Middleware/authMiddleware.js";
import { isLibrarian } from "../Middleware/roleMiddleware.js";

const router = express.Router();

// issue a book (Librarian)
router.post("/issue", protect, isLibrarian, issueBook);

// return book (any logged-in user)
router.put("/return/:id", protect, returnBook);

// all issue book (Librarian)
router.get("/", protect, isLibrarian, getAllBooksIssued);

// my issue books (student)
router.get("/my", protect, getIssueBookById);

export default router;