const User = require('../models/user.model');
const CustomError = require('../lib/customError');

exports.getUsers = async () => {
  try {
    const users = await User.find({}, 'firstName');
    return users;
  } catch (error) {
    throw new CustomError(`Failed to get users: ${error.message}`, 500);
  }
};
