const router = require('express').Router();
const CategoriesController = require('../controllers/categories.controllers');

router.get('/categories', CategoriesController.getCategories);
router.get('/categories/:id', CategoriesController.getCategory);

module.exports = router;
