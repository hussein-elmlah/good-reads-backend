const asyncWrapper = require('../lib/async-wrapper');
const CategoriesModel = require('../models/categories.model');

// module.exports = {
//   async getCategories(req, res) {
//     try {
//       const categories = await CategoriesModel.method();
//       res.json(categories);
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   },

//   async getCategory(req, res) {
//     try {
//       const category = await CategoriesModel.create();
//       res.json(category);
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   },
// };

const CategoriesController = {
  getAllCategories: async (req, res) => {
    const [error, categories] = await asyncWrapper(CategoriesModel.find());

    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json(categories);
  },

  addCategory: async (req, res) => {
    const { categoryName } = req.body;

    // Validate input
    if (!categoryName || !/^[a-zA-Z]+$/.test(categoryName)) {
      return res.status(400).json({ error: 'Invalid Category Name' });
    }

    const [error, savedCategory] = await asyncWrapper(CategoriesModel.create({ categoryName }));

    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(201).json(savedCategory);
  },

  getCategoryById: async (req, res) => {

  },

  updateCategory: async (req, res) => {
    const { id } = req.params;
    const { categoryName } = req.body;

    // Validate input
    if (!categoryName || !/^[a-zA-Z]+$/.test(categoryName)) {
      return res.status(400).json({ error: 'Invalid Category Name' });
    }

    const [error, updatedCategory] = await asyncWrapper(
      CategoriesModel.findByIdAndUpdate(id, { categoryName }, { new: true }),
    );

    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(updatedCategory);
  },

  deleteCategory: async (req, res) => {
    const { id } = req.params;

    const [error, deletedCategory] = await asyncWrapper(CategoriesModel.findByIdAndDelete(id));

    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  },
};

module.exports = CategoriesController;
