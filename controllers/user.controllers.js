const UserModel = require('../models/user.model');

module.exports = {
  login(req, res, next) {
    UserModel.method()
      .then(() => res.json({}))
      .catch((err) => res.status(400).json({ err }));
  },

  register(req, res, next) {
    UserModel.method()
      .then(() => res.status(201).json({}))
      .catch((err) => res.status(400).json({ err }));
  }
};