const router = require('express').Router();
const UserController = require('../controllers/user.controllers');
const asyncWrapper = require('../lib/async-wrapper');
const generateToken = require('../utils/jwtUtils');

// router.post('/login', UserController.login);
// router.post('/register', UserController.register);
// router.get('/:id/books', UserController.getUserBooks);

router.get('/', async (req, res, next) => {
  const [err, users] = await asyncWrapper(UserController.getUsers());
  if (err) {
    return next(err);
  }
  res.json(users);
});

router.post('/register', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UserController.createUser(req.body));
  if (err) {
    return next(err);
  }
  const token = generateToken(user);

  res.status(201).json({ user, token });
});

module.exports = router;
