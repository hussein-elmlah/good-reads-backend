const UserModel = require('../models/user.model');

module.exports = {
  async login(req, res) {
    const user = req.body;
    user.username = user.username.trim();

    try {
      const newUser = await UserModel.method(user);
      res.json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async register(req, res) {
    const user = req.body;
    user.username = user.username.trim();

    try {
      const newUser = await UserModel.method(user);
      res.json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async getUserBooks(req, res) {
    try {
      const newUser = await UserModel.method();
      res.json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
