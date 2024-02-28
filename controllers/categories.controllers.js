const asyncWrapper = require('../lib/async-wrapper');
const Category = require('../models/categories.model');

const CategoriesController = {
  getAllCategories: async (req, res, next) => {
    const [error, categories] = await asyncWrapper(Category.find());

    if (error) {
      next(error);
    }

    res.json(categories);
  },

  addCategory: async (req, res, next) => {
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

  updateCategory: async (req, res, next) => {
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

  deleteCategory: async (req, res, next) => {
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
  //   const [error, popularCategories] = await asyncWrapper(Category.aggregate([
  //     {
  //       $project: {
  //         _id: 1,
  //         firstName: 1,
  //         lastName: 1,
  //         bookCount: { $size: '$books' },
  //       },
  //     },
  //     {
  //       $sort: { bookCount: -1 },
  //     },
  //     {
  //       $limit: 3,
  //     },
  //   ]));

  //   if (error) {
  //     next(error);
  //   }

  //   res.json({ popularCategories });
  },
};

module.exports = CategoriesController;
