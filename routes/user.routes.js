const router = require('express').Router();
const UserController = require('../controllers/user.controllers');
const asyncWrapper = require('../lib/async-wrapper');
const generateToken = require('../utils/jwtUtils');
const { authenticateUser } = require('../middlewares/authentication');
const { authorizeUser } = require('../middlewares/authorization');

router.post('/register', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UserController.register(req.body));
  if (err) {
    return next(err);
  }
  try {
    const token = await generateToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { body: { username, password } } = req;
  const [err, token] = await asyncWrapper(
    UserController.login({ username, password }),
  );
  if (err) {
    return next(err);
  }
  res.status(201).json({ token });
});

router.get('/:id/books', authenticateUser, authorizeUser, async (req, res, next) => {
  const userId = req.params.id;
  const [err, books] = await asyncWrapper(UserController.getUserBooks(userId));
  if (err) {
    return next(err);
  }
  res.status(200).json(books);
});

module.exports = router;
