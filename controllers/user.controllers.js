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

exports.createUser = async ({
  firstName, lastName, email, username, password, image,
}) => {
  try {
    const user = await User.create({
      firstName, lastName, email, username, password, image,
    });
    return user;
  } catch (error) {
    throw new CustomError(`Failed to create user: ${error.message}`, 500);
  }
};
