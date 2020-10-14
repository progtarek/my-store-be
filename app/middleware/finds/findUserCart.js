const Cart = require('../../DB/models/Cart');

module.exports = async (req, res, next) => {
  const { user } = req;
  const cart = await Cart.findOne({
    user: user._id,
  }).populate('items.product');

  res.locals.cart = cart;
  next();
};
