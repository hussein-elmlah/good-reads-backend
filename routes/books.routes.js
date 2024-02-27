const router = require('express').Router();
const BooksController = require('../controllers/books.controllers');

router.post('/', BooksController.createBook);
router.get('/', BooksController.getAllBooks);
router.get('/:id', BooksController.getBookById);
router.put('/:id', BooksController.updateBook);
router.delete('/:id', BooksController.deleteBook);
router.get('/', BooksController.getBooksByStatus);

module.exports = router;
