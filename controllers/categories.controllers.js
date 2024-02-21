const CategoriesModel = require('../models/categories.model');

module.exports = {
  async getCategories(req, res) {
    try {
      const categories = await CategoriesModel.method();
      res.json(categories);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async getCategory(req, res) {
    try {
      const category = await CategoriesModel.create();
      res.json(category);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
