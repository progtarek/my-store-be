const Product = require('../../DB/models/Product');

module.exports.readAll = async (req, res, next) => {
  try {
    let { limit, page } = req.query;
    limit = limit ? parseInt(limit, 10) : 10;
    page = page ? parseInt(page, 10) : 1;
    const products = await Product.paginate(
      {},
      { limit, page, populate: [{ path: 'category' }] }
    );
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const { user } = req;
    const product = await Product.create({
      ...req.body,
      createdBy: user._id,
      updatedBy: user._id,
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let { product } = res.locals;
    Object.assign(product, req.body);
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports.remove = async (req, res, next) => {
  try {
    let { product } = res.locals;
    await product.remove();

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
