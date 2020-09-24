const User = require('../../DB/models/User');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  res.locals.user = user;
  next();
};
