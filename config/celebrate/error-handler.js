const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const error = err.details.get('body').details[0];

    return res.status(422).json({
      message: error.message,
    });
  }

  return next(err);
};
