const jwt = require('jsonwebtoken');
const AdminModel = require('../models/admin.model');

module.exports = {
  async login(req, res, next) {
    const { username, password } = req.body;

    try {
      const admin = await AdminModel.findOne({ username: `${username}` });

      if (admin && await admin.verifyPassword(password)) {
        const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.json({ token });
      }
    } catch (err) {
      err.status = 400;
      next(err);
    }

    res.status(404).json({ error: 'Username or password incorrect.' });
  },

  async register(req, res, next) {
    const { username, password } = req.body;

    if (username && username.includes(' ')) {
      return res.status(400).json({ error: 'Username cannot contain spaces.' });
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
