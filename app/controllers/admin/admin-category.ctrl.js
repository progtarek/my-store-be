const Category = require('../../DB/models/Category');

module.exports.readAll = async (req, res, next) => {
  try {
    const { limit, page } = req.params;
    const categories = await Category.paginate({}, { limit, page });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const categoryCounts = await Category.countDocuments();
    const category = await Category.create({
      ...req.body,
      sort: categoryCounts + 1,
    });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let { category } = res.locals;
    Object.assign(category, req.body);
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};