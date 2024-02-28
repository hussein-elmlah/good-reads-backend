const router = require('express').Router();
const CategoriesController = require('../controllers/categories.controllers');
const { authenticateAdmin } = require('../middlewares/authentication');

router.get('/', CategoriesController.getAllCategories);
router.post('/', authenticateAdmin, CategoriesController.addCategory);

router.get('/popular', CategoriesController.getPopularCategories);

router.get('/:id', CategoriesController.getCategoryById);
router.put('/:id', authenticateAdmin, CategoriesController.updateCategory);
router.delete('/:id', authenticateAdmin, CategoriesController.deleteCategory);

module.exports = router;
