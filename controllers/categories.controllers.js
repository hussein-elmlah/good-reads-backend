const asyncWrapper = require('../lib/async-wrapper');
const CategoriesModel = require('../models/categories.model');

const CategoriesController = {
  getAllCategories: async (req, res) => {
    const [error, categories] = await asyncWrapper(CategoriesModel.find());

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(categories);
  },

  addCategory: async (req, res) => {
    console.log('hhi');
    const { name } = req.body;
    console.log(req.body);

    if (!name || !/^[a-zA-Z]+$/.test(name)) {
      return res.status(400).json({ error: 'Invalid Category Name.' });
    }

    const [error, savedCategory] = await asyncWrapper(CategoriesModel.create({ name }));

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(savedCategory);
  },

  getCategoryById: async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID. ID must be a number.' });
    }

    const [error, category] = await asyncWrapper(CategoriesModel.findById(req.params.id));

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.json(category);
  },

  updateCategory: async (req, res) => {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !/^[a-zA-Z]+$/.test(name)) {
      return res.status(400).json({ error: 'Invalid Category Name.' });
    }

    const [error, updatedCategory] = await asyncWrapper(
      CategoriesModel.findByIdAndUpdate(id, { name }, { new: true }),
    );

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.json(updatedCategory);
  },

  deleteCategory: async (req, res) => {
    console.log(req.user, '=========================================================================)');
    const { id } = req.params;

    const [error, deletedCategory] = await asyncWrapper(CategoriesModel.findByIdAndDelete(id));

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.json({ message: 'Category deleted successfully.' });
  },
};

module.exports = CategoriesController;
