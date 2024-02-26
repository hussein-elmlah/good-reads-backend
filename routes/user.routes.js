const router = require('express').Router();
const UserController = require('../controllers/user.controllers');
const asyncWrapper = require('../lib/async-wrapper');
const generateToken = require('../utils/jwtUtils');
const { authenticateUser } = require('../middlewares/authentication');
const { authorizeUser } = require('../middlewares/authorization');
const uploadSingleImage = require('../middlewares/fileUploadMiddleware');

router.post('/register', uploadSingleImage, async (req, res, next) => {
  const { body, file } = req;
  console.log('file:\n', file);
  const [err, user] = await asyncWrapper(UserController.register({ ...body, image: file }));
  if (err) {
    return next(err);
  }
  try {
    const token = await generateToken(user);
    console.log('created user successfully:\n', user);
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
  res.json({ token });
});

router.get('/:id/books', authenticateUser, authorizeUser, async (req, res, next) => {
  const userId = req.params.id;
  const { limit, skip, status } = req.query;
  const [err, books] = await asyncWrapper(UserController.getUserBooks(userId, status, limit, skip));
  if (err) {
    return next(err);
  }
  res.json(books);
});

module.exports = router;
