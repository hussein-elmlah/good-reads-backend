const router = require('express').Router();
const express = require('express');
const CategoriesController = require('../controllers/categories.controllers');

// router.get('/categories', CategoriesController.getCategories);
// router.get('/categories/:id', CategoriesController.getCategory);

router.get('/', CategoriesController.getAllCategories);
router.post('/', CategoriesController.addCategory);
router.put('/:id', CategoriesController.updateCategory);
router.delete('/:id', CategoriesController.deleteCategory);

module.exports = router;
