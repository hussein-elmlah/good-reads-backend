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

  async register(req, res, next) {
    const { username, password } = req.body;

    if (username && username.includes(' ')) {
      return res.status(400).json({ error: 'Username should not contain spaces' });
    }

    try {
      const newUser = await AdminModel.create({ username, password });
      res.json(newUser);
    } catch (err) {
      err.status = 400;
      next(err);
    }
  },
};
