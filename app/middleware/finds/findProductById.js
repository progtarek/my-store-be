const Product = require('../../DB/models/Product');

module.exports = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params._id);

    if (!product) {
      return res.status(404).json({
        message: 'Product does not exist',
      });
    } else {
      res.locals.product = product;
      next();
    }
  } catch (error) {
    next(error);
  }
};
