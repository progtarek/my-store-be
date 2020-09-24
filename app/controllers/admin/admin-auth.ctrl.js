const User = require('../../DB/models/User');
const bcrypt = require('bcrypt');

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
    const user = await User.create({ ...req.body });
    delete user.password;
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { password } = req.body;

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const token = user.generateJWT();
    return res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      token,
    });
  } catch (error) {
    next(error);
  }
};
