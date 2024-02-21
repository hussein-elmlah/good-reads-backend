const AuthorsModel = require('../models/authors.model');

module.exports = {
  async getAuthors(req, res) {
    try {
      const authors = await AuthorsModel.method();
      res.json(authors);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async getAuthor(req, res) {
    try {
      const author = await AuthorsModel.create();
      res.json(author);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
