const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const error = err.details.get('body').details[0];

    return res.status(422).json({
      message: error.message,
    });
  } else {
    return res.status(500).json({
      message:
        err && err.stack
          ? err.stack.toString().split(/\r\n|\n/)[0]
          : 'There is something wrong. see error stack.',
    });
  }
  next(err);
};
