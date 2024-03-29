const router = require('express').Router();
const UserController = require('../controllers/user.controllers');
const asyncWrapper = require('../lib/async-wrapper');
const { generateTokenUser } = require('../utils/jwtUtils');
const { authenticateUser } = require('../middlewares/authentication');
const { authorizeUser } = require('../middlewares/authorization');
const uploadSingleImage = require('../middlewares/fileUploadMiddleware');

router.post('/register', uploadSingleImage, async (req, res, next) => {
  const { body, file } = req;
  const [err, user] = await asyncWrapper(UserController.register({ ...body, image: file }));
  if (err) {
    return next(err);
  }
  try {
    const token = await generateTokenUser(user);
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

router.put('/:id/:bookId', authenticateUser, authorizeUser, async (req, res, next) => {
  const { id: userId, bookId } = req.params;
  const { book_status, rating } = req.body;
  const [err, updatedBook] = await asyncWrapper(
    UserController.updateUserBook(userId, bookId, book_status, rating),
  );
  if (err) {
    return next(err);
  }
  res.json(updatedBook);
});

router.patch('/:id/books', authenticateUser, authorizeUser, async (req, res, next) => {
  const { id: userId } = req.params;
  const { books } = req.body;
  const [err, updatedBooks] = await asyncWrapper(
    UserController.updateUserBooks(userId, books),
  );
  if (err) {
    return next(err);
  }
  res.json(updatedBooks);
});

module.exports = router;
