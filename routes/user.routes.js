const router = require('express').Router();
const UserController = require('../controllers/admin.controllers');

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/:id/books', UserController.getBooks);

module.exports = router;
