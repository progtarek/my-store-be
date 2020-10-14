const Cart = require('../../DB/models/Cart');

module.exports.create = async (req, res, next) => {
  try {
    let { cart } = res.locals;
    const { items } = req.body;
    if (cart) {
      for (const item of items) {
        const itemExistIndex = cart.items.findIndex(
          (_) => _.product.id === item.product
        );

        if (itemExistIndex !== -1) {
          cart.items[itemExistIndex].quantity = item.quantity;
        } else {
          cart.items.push(item);
        }
      }
      await cart.save();
    } else {
      cart = await Cart.create({
        ...req.body,
        user: req.user._id,
      });
    }
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

module.exports.read = async (req, res, next) => {
  try {
    let { cart } = res.locals;
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
