const Book = require('../models/books.model');

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get books by status
exports.getBooksByStatus = async (req, res) => {
  const { status } = req.query;
  const query = status ? { 'reviews.state': { $regex: `.*${status}.*`, $options: 'i' } } : {};

  try {
    const books = await Book.find(query);
    if (books.length === 0) {
      return res.status(404).json({ message: `No books with status '${status}' were found.` });
    }
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Search books
// GET /api/books/search?query=searchTerm
exports.SearchBooks= async (req, res) => {
  const query = req.query.query;

  try {
    const books = await Book.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search by title
        { author: { $regex: query, $options: 'i' } }, // Case-insensitive search by author
        // Add more fields to search if needed
      ]
    });

    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getPopularBooks = async (req, res) => {
  
};
