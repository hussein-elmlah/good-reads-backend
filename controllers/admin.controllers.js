const AdminModel = require('../models/admin.model');

module.exports = {
  async login(req, res) {
    const user = req.body;

    try {
      const valid = await AdminModel.method(user);
      res.json(valid);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async register(req, res) {
    const user = req.body;

    try {
      const valid = await AdminModel.method(user);
      res.json(valid);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
