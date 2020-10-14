const Cart = require('../../DB/models/Cart');

module.exports = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
      'items._id': req.params._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart item does not exist',
      });
    } else {
      res.locals.cart = cart;
      next();
    }
  } catch (error) {
    next(error);
  }
};
