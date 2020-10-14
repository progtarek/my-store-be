const bcrypt = require('bcrypt');

module.exports.login = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { password } = req.body;

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect || user.role !== 'user') {
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
