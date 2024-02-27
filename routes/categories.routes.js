const router = require('express').Router();
const CategoriesController = require('../controllers/categories.controllers');

router.get('/', CategoriesController.getAllCategories);
router.post('/', CategoriesController.addCategory);
router.get('/:id', CategoriesController.getCategoryById);
router.put('/:id', CategoriesController.updateCategory);
router.delete('/:id', CategoriesController.deleteCategory);

module.exports = router;
