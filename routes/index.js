const router = require('express').Router();

router.use('/user', require('./user.routes'));
router.use('/admin', require('./admin.routes'));

router.use('/categories', require('./categories.routes'));
router.use('/books', require('./books.routes'));
router.use('/authors', require('./authors.routes'));

module.exports = router;
