const router = require('express').Router();
const UserController = require('../controllers/user.controllers');

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/:id/books', UserController.getUserBooks);

module.exports = router;
