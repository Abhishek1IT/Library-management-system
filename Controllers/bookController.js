import Book from '../Models/Book.js';

// Add a new book
export const addBook = async (req, res, next) => {
  try {
    const { title, author, isbn, publishedDate, copiesAvailable } = req.body;
    // Validate required fields
    if (!title || !author || !isbn) {
      const error = new Error("Title, Author and ISBN are required");
      error.statusCode = 400;
      return next(error);
    }
    // Create new book
    const book = await Book.create({
      title,
      author,
      isbn,
      publishedDate,
      copiesAvailable,
    });
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    next(error);
  }
};

// Get all books
export const getAllBooks = async (req, res, next) => {
  try {
    // Fetch all books from the database
    const books = await Book.find();
    res.status(200).json({ success: true, count: books.length, books });
  } catch (error) {
    next(error);
  }
};

// Get book by ID
export const getBookById = async (req, res, next) => {
  try {
    // Fetch book by ID from the database
    const book = await Book.findById(req.params.id);
    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    next(error);
  }
};

// Update book details
export const updatedBook = async (req, res, next) => {
  try {
    // Update book by ID
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      success: true,
      message: "Book Update successfully",
      book,
    });
  } catch (error) {
    next(error);
  }
};

// Delete book
export const deleteBook = async (req, res, next) => {
  try {
    // Delete book by ID
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      success: true,
      message: "Book Delete successfully",
      book,
    });
  } catch (error) {
    next(error);
  }
};
