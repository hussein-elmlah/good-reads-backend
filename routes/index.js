const router = require('express').Router();
const userRouter = require('./user.routes');
const adminRouter = require('./admin.routes');
const categoriesRouter = require('./categories.routes');
const booksRouter = require('./books.routes');
const authorsRouter = require('./authors.routes');

router.use('/users', userRouter);
router.use('/admin', adminRouter);

router.use('/categories', categoriesRouter);
router.use('/books', booksRouter);
router.use('/authors', authorsRouter);

module.exports = router;
