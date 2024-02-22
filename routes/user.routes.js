const router = require('express').Router();
const UserController = require('../controllers/user.controllers');
const asyncWrapper = require('../lib/async-wrapper');

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

module.exports = router;
