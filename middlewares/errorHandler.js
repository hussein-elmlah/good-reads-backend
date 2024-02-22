const CustomError = require('../lib/customError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError || err.status) {
    res.status(err.status || 500).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  console.log('\nerrorHandler : ===========\n', err);
};

module.exports = errorHandler;
