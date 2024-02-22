const CustomError = require('../lib/customError');

const authorizeUser = async (req, res, next) => {
  const userId = req.user.id;
  const requestedUserId = req.params.id;
  if (!userId || !requestedUserId) {
    return next(new CustomError('Unauthorized access', 403));
  }

  if (userId !== requestedUserId) {
    return next(new CustomError('Unauthorized access', 403));
  }

  next();
};

module.exports = {
  authorizeUser,
};
