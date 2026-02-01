import Book from '../Models/Book.js';
import Issue from '../Models/Issue.js';

// Issue a book to a user
export const issueBook = async (req, res, next) => {
  try {
    // Fetch book details
    const { bookId } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!bookId ) {
      const error = new Error("Book ID and User ID are required");
      error.statusCode = 400;
      return next(error);
    }

    // Check if book is available
    const book = await Book.findById(bookId);
    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      return next(error);
    }

    // Check copies available
    if (book.copiesAvailable < 1) {
      const error = new Error("No copies available for this book");
      error.statusCode = 400;
      return next(error);
    }

    // Create issue record
    const issue = await Issue.create({
      book: bookId,
      user: userId,
      issueDate: new Date(),
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "issued",
    });

    // Decrease available copies
    book.copiesAvailable -= 1;
    await book.save();
    res.status(201).json({
      success: true,
      message: "Book issued successfully",
      issue,
    });
  } catch (error) {
    next(error);
  }
};

// Return a book
export const returnBook = async (req, res, next) => {
  try {
    // Fetch issue details
    const { issueId } = req.body;

    // Validate input
    if (!issueId) {
      const error = new Error("Issue ID is required");
      error.statusCode = 400;
      return next(error);
    }

    // Find issue record
    const issue = await Issue.findById(issueId);

    // Check if issue record exists
    if (!issue) {
      const error = new Error("Issue record not found");
      error.statusCode = 404;
      return next(error);
    }

    // Check if book is already returned
    if (issue.status === "returned") {
      const error = new Error("Book already returned");
      error.statusCode = 400;
      return next(error);
    }

    // Update issue record
    issue.status = "returned";
    issue.returnDate = new Date();
    await issue.save();

    // Increase available copies
    const book = await Book.findById(issue.book);
    book.copiesAvailable += 1;
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      issue,
    });
  } catch (error) {
    next(error);
  }
};

// Get all issued books
export const getAllBooksIssued = async (req, res, next) => {
  try {
    // Fetch all issue records
    const issues = await Issue.find()
      .populate("book", "title author isbn")
      .populate("user", "name email role");
    res.status(200).json({
      success: true,
      count: issues.length,
      issues,
    });
  } catch (error) {
    next(error);
  }
};

// Get issue details by ID
export const getIssueBookById = async (req, res, next) => {
  try {
    //Fetch issue records By Id
    const issues = await Issue
      .find({ user: req.params.userId })
      .populate("book", "title author isbn");

    res.status(200).json({
      success: true,
      count: issues.length,
      issues,
    });
  } catch (error) {
    next(error);
  }
};
