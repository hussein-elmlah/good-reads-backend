// authors.controller.js

const express = require('express');
const asyncWrapper = require('../lib/async-wrapper');
const Author = require('../models/authors.model');

const AuthorsController = {
  getAllAuthors: async (req, res) => {
    const [error, authors] = await asyncWrapper(Author.find());

    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json(authors);
  },

  addAuthor: async (req, res) => {
    const {
      firstName, lastName, dob, books, photo,
    } = req.body;

    // Validate input
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
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }

    res.status(201).json(savedAuthor);
  },

  async updateAuthor(req, res) {
    const { id } = req.params;
    const {
      firstName, lastName, dob, books, photo,
    } = req.body;

    // Validate input
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
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }

    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(updatedAuthor);
  },

  deleteAuthor: async (req, res) => {
    const { id } = req.params;

    const [error, deletedAuthor] = await asyncWrapper(Author.findByIdAndDelete(id));

    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!deletedAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json({ message: 'Author deleted successfully' });
  },
};

module.exports = AuthorsController;
