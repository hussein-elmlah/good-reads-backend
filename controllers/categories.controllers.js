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
          $unwind: '$category', // Unwind the category array
        },
        {
          $group: {
            _id: '$category', // Grouping by the category field directly
            count: { $sum: 1 }, // Counting the number of books in each category
          },
        },
        {
          $sort: { count: -1 }, // Sorting by count in descending order
        },
        {
          $lookup: {
            from: 'categories', // The name of the collection containing categories
            localField: '_id', // Field from the previous stage
            foreignField: 'name', // Field from the categories collection
            as: 'category', // Name of the field to store the matched category documents
          },
        },
        {
          $unwind: '$category', // Unwind the category array
        },
        {
          $project: {
            _id: 0,
            name: '$category.name', // Project only the name field
            count: 1,
          },
        },
      ]);

      res.json({ popularCategories });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = CategoriesController;
