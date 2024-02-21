const BooksModel = require('../models/books.model');

module.exports = {
  async getBooks(req, res) {
    try {
      const books = await BooksModel.method();
      res.json(books);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async getBook(req, res) {
    try {
      const book = await BooksModel.create();
      res.json(book);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
