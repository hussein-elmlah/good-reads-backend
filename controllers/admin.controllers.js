const AdminModel = require('../models/admin.model');

module.exports = {
  login(req, res, next) {
    AdminModel.method()
      .then(() => res.json({}))
      .catch((err) => res.status(400).json({ err }));
  },

  register(req, res, next) {
    const { username, password } = req.body;

    AdminModel.method()
      .then(() => res.status(201).json({}))
      .catch((err) => res.status(400).json({ err }));
  }
};