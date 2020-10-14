const Product = require('../../DB/models/Product');

module.exports = async (req, res, next) => {
  try {
    const { items } = req.body;
    const ids = items.map((item) => item.product);
    const products = await Product.find({
      _id: {
        $in: ids,
      },
    });

    if (!products || !products.length || products.length !== ids.length) {
      return res.status(404).json({
        message: 'Product does not exist',
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
