const router = require('express').Router();
const BooksController = require('../controllers/books.controllers');

router.get('/books', BooksController.getBooks);
router.get('/books/:id', BooksController.getBook);

module.exports = router;
