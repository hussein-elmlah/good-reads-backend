const express = require('express');
const AuthorsController = require('../controllers/authors.controllers');
const { authenticateAdmin } = require('../middlewares/authentication');

const router = express.Router();

router.use(express.json({ limit: '5mb' }));
router.use(express.urlencoded({ limit: '5mb', extended: true }));

router.get('/', AuthorsController.getAllAuthors);
router.get('/authorpage', AuthorsController.getAllAuthorsPaginated);
router.post('/', authenticateAdmin, AuthorsController.addAuthor);

router.get('/popular', AuthorsController.getPopularAuthors);

router.get('/:id', AuthorsController.getAuthor);
router.put('/:id', authenticateAdmin, AuthorsController.updateAuthor);
router.delete('/:id', authenticateAdmin, AuthorsController.deleteAuthor);

module.exports = router;
