const router = require('express').Router();
const UserController = require('../controllers/user.controllers');
const asyncWrapper = require('../lib/async-wrapper');
const generateToken = require('../utils/jwtUtils');

// router.get('/:id/books', UserController.getUserBooks);

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

module.exports = router;
