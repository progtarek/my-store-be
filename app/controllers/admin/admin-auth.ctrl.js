const User = require('../../DB/models/User');

module.exports.signup = async (req, res, next) => {
  try {
    const exist = await User.findOne({
      $or: [
        {
          email: req.body.email,
        },
        {
          username: req.body.username,
        },
      ],
    });
    if (exist)
      return res.status(409).json({
        message: 'User already exists',
      });
    return await User.create({ ...req.body });
  } catch (error) {
    next(error);
  }
};
