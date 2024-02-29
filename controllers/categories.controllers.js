const asyncWrapper = require('../lib/async-wrapper');
const Category = require('../models/categories.model');
const Book = require('../models/books.model');

const CategoriesController = {
  getAllCategories: async (req, res, next) => {
    const [error, categories] = await asyncWrapper(Category.find());

    if (error) {
      next(error);
    }

    res.json(categories);
  },

  addCategory: async (req, res) => {
    const { name } = req.body;

    if (!name || !/^[a-zA-Z]+$/.test(name)) {
      return res.status(400).json({ error: 'Invalid Category Name.' });
    }

    const [error, savedCategory] = await asyncWrapper(Category.create({ name }));

    if (error) {
      next(error);
    }

    res.status(201).json(savedCategory);
  },

  getCategoryById: async (req, res, next) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid category ID. ID must be a number.' });
    }

    const [error, category] = await asyncWrapper(Category.findById(req.params.id));

    if (error) {
      next(error);
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
      Category.findByIdAndUpdate(id, { name }, { new: true }),
    );

    if (error) {
      next(error);
    }

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.json(updatedCategory);
  },

  deleteCategory: async (req, res) => {
    const { id } = req.params;

    const [error, deletedCategory] = await asyncWrapper(Category.findByIdAndDelete(id));

    if (error) {
      next(error);
    }

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.json({ message: 'Category deleted successfully.' });
  },

  getPopularCategories: async (req, res, next) => {
    try {
      const popularCategories = await Book.aggregate([
        {
          $unwind: '$category',
        },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: 'name',
            as: 'category',
          },
        },
        {
          $unwind: '$category',
        },
        {
          $project: {
            _id: 0,
            name: '$category.name',
            count: 1,
          },
        },
      ]);
      const categoriesNames = popularCategories.map((category) => category.name);

      res.json(categoriesNames);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = CategoriesController;
