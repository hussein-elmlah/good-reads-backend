const router = require('express').Router();
const express = require('express');
const AuthorsController = require('../controllers/authors.controllers');

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
router.get('/', AuthorsController.getAllAuthors);
router.post('/', AuthorsController.addAuthor);
router.get('/:id', AuthorsController.getAuthor);
router.put('/:id', AuthorsController.updateAuthor);
router.delete('/:id', AuthorsController.deleteAuthor);

module.exports = router;
