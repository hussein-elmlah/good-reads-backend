const asyncWrapper = require('../lib/async-wrapper');
const Author = require('../models/authors.model');

const AuthorsController = {
  getAllAuthors: async (req, res, next) => {
    const [error, authors] = await asyncWrapper(Author.find());

    if (error) {
      next(500);
    }

    res.json(authors);
  },

  getAllAuthorsPaginated: async (req, res, next) => {
    const pageNumber = parseInt(req.query.pageNumber, 10) || 0;
    const limitSize = parseInt(req.query.limitSize, 10) || 5;
    const skip = pageNumber * limitSize;

    const [error, authors] = await asyncWrapper(
      Author.find()
        .skip(skip)
        .limit(limitSize)
        .exec(),
    );

    if (error) {
      return next(error);
    }

    if (authors.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.json(authors);
  },

  addAuthor: async (req, res, next) => {
    const {
      firstName, lastName, dob, books, photo,
    } = req.body;

    if (
      !firstName
      || !/^[a-zA-Z]+$/.test(firstName)
      || !lastName
      || !/^[a-zA-Z]+$/.test(lastName)
      || !dob
      || !books
    ) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const [error, savedAuthor] = await asyncWrapper(
      Author.create({
        firstName, lastName, dob, books, photo,
      }),
    );

    if (error) {
      next(error);
    }

    res.status(201).json(savedAuthor);
  },

  async updateAuthor(req, res, next) {
    const { id } = req.params;
    const {
      firstName, lastName, dob, books, photo,
    } = req.body;

    if (
      !firstName
      || !/^[a-zA-Z]+$/.test(firstName)
      || !lastName
      || !/^[a-zA-Z]+$/.test(lastName)
      || !dob
      || !books
    ) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const [error, updatedAuthor] = await asyncWrapper(
      Author.findByIdAndUpdate(id, {
        firstName, lastName, dob, books, photo,
      }, { new: true }),
    );

    if (error) {
      next(error);
    }

    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(updatedAuthor);
  },

  deleteAuthor: async (req, res, next) => {
    const { id } = req.params;

    const [error, deletedAuthor] = await asyncWrapper(Author.findByIdAndDelete(id));

    if (error) {
      next(error);
    }

    if (!deletedAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json({ message: 'Author deleted successfully' });
  },

  getPopularAuthors: async (req, res, next) => {
    const [err, popularAuthors] = await asyncWrapper(Author.aggregate([
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: 'author',
          as: 'books',
        },
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          bookCount: { $size: '$books' },
        },
      },
      {
        $sort: { bookCount: -1 },
      },
      {
        $limit: 3,
      },
    ]));

    if (err) {
      next(err);
    }

    res.json({ popularAuthors });
  },
  async getAuthor(req, res, next) {
    const { id } = req.params;

    const [error, selectedAuthor] = await asyncWrapper(
      Author.findById(id),
    );

    if (error) {
      next(error);
    }

    if (!selectedAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(selectedAuthor);
  },
};

module.exports = AuthorsController;
