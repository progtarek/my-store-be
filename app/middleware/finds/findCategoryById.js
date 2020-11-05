const Category = require('../../DB/models/Category');

module.exports = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params._id).populate(
      'parent',
      'name'
    );

    if (!category) {
      return res.status(404).json({
        message: 'Category does not exist',
      });
    } else {
      res.locals.category = category;
      next();
    }
  } catch (error) {
    next(error);
  }
};
