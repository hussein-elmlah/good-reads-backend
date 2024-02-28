const router = require('express').Router();
const BooksController = require('../controllers/books.controllers');
const { authenticateAdmin } = require('../middlewares/authentication');

router.get('/', BooksController.getAllBooks);
router.get('/', BooksController.getBooksByStatus);
router.post('/', authenticateAdmin, BooksController.createBook);

router.get('/popular', BooksController.getPopularBooks);

router.get('/:id', BooksController.getBookById);
router.put('/:id', authenticateAdmin, BooksController.updateBook);
router.delete('/:id', authenticateAdmin, BooksController.deleteBook);

module.exports = router;
