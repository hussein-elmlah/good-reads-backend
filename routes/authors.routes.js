const router = require('express').Router();
const AuthorsController = require('../controllers/authors.controllers');

router.get('/authors', AuthorsController.getAuthors);
router.get('/authors/:id', AuthorsController.getAuthor);

module.exports = router;
