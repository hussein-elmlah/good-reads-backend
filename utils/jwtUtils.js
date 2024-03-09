require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_SECRET_ADMIN } = process.env;

const generateTokenUser = (user) => {
  try {
    if (!user || !user.username || !user._id) {
      return new Error('Invalid user object.');
    }

    if (!JWT_SECRET) {
      return new Error('JWT secret is not defined.');
    }

    const token = jwt.sign(
      { username: user.username, id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    return token;
  } catch (error) {
    console.error('Error generating JWT token:', error.message);
    throw error;
  }
};

module.exports = { generateTokenUser };
