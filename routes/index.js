const express = require('express');
const router = require('express').Router();
const userRouter = require('./user.routes');
const adminRouter = require('./admin.routes');
const categoriesRouter = require('./categories.routes');
const booksRouter = require('./books.routes');
const authorsRouter = require('./authors.routes');

const app = express();
app.use(express.json({ limit: '88kb' }));
app.use(express.urlencoded({ limit: '88kb', extended: true }));

router.use('/user', userRouter);
router.use('/admin', adminRouter);

router.use('/categories', categoriesRouter);
router.use('/books', booksRouter);
router.use('/authors', authorsRouter);

module.exports = router;
