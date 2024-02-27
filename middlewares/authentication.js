const jwt = require('jsonwebtoken');
const util = require('util');
const User = require('../models/user.model');
const CustomError = require('../lib/customError');

const { JWT_SECRET, JWT_SECRET_Admin } = process.env;

const verifyAsync = util.promisify(jwt.verify);

const authenticateUser = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      throw new CustomError('UN_Authenticated', 401);
    }

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decodedToken = await verifyAsync(token, JWT_SECRET);
    if (!decodedToken) {
      throw new CustomError('Invalid token', 401);
    }

    const user = await User.findById(decodedToken.id).exec();

    if (!user) {
      throw new CustomError("Token's user not found", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof CustomError) {
      return next(error);
    }
    return next(new CustomError(error.message, 500));
  }
};

const authenticateAdmin = async (req, res, next) => {
  console.log("Authenticating Admin");
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      throw new CustomError('UN_Authenticated', 401);
    }

    if (!JWT_SECRET_Admin) {
      throw new Error('JWT_SECRET_Admin is not defined');
    }

    const decodedToken = await verifyAsync(token, JWT_SECRET_Admin);
    if (!decodedToken) {
      throw new CustomError('Invalid token', 401);
    }

    const user = await User.findById(decodedToken.id).exec();

    if (!user) {
      throw new CustomError("Token's user not found", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof CustomError) {
      return next(error);
    }
    return next(new CustomError(error.message, 500));
  }
};


module.exports = {
  authenticateUser, authenticateAdmin
};
