const router = require('express').Router();
const BooksController = require('../controllers/books.controllers');

router.post('/', BooksController.createBook);
router.get('/', BooksController.getAllBooks);
router.get('/:id', BooksController.getBookById);
router.put('/:id', BooksController.updateBook);
router.delete('/:id', BooksController.deleteBook);
// Route to get books by status
// /books?status=current   /books?status=want   /books?status=read  /books to get all books
router.get('/books', BooksController.getBooksByStatus);
module.exports = router;
