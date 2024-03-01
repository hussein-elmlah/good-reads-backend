const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

const { JWT_SECRET_ADMIN } = process.env;

module.exports = {
  async login(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Must provide username and password for login.' });
    }

    try {
      const admin = await Admin.findOne({ username: `${username}` });

      if (admin && await admin.verifyPassword(password)) {
        const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET_ADMIN, { expiresIn: '7d' });
        return res.json({ token });
      }
    } catch (err) {
      next(err);
    }

    res.status(401).json({ error: 'Username or password incorrect.' });
  },

  async register(req, res, next) {
    const { username, password } = req.body;

    if (username && username.includes(' ')) {
      return res.status(400).json({ error: 'Username cannot contain spaces.' });
    }

    try {
      const newUser = await Admin.create({ username, password });
      res.status(201).json(newUser);
    } catch (err) {
      if (err.code === 11000 && err.keyPattern.username) {
        return res.status(409).json({ error: 'Username already exists, please choose a different one.' });
      }
      err.status = 400;
      next(err);
    }
  },
};
