const router = require('express').Router();
const express = require('express');
const AuthorsController = require('../controllers/authors.controllers');

router.get('/', AuthorsController.getAllAuthors);
router.post('/', AuthorsController.addAuthor);
router.put('/:id', AuthorsController.updateAuthor);
router.delete('/:id', AuthorsController.deleteAuthor);

module.exports = router;
