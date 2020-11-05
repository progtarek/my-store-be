const { celebrate, Joi } = require('celebrate');
const Category = require('../../../DB/models/Category');

module.exports.validateCategorySchema = celebrate({
  body: Joi.object().keys({
    categoryPicture: Joi.string().required(),
    name: Joi.object().keys({
      en: Joi.string().required().min(3),
      ar: Joi.string().required().min(3),
    }),
    parent: Joi.string().hex().optional().allow(null),
  }),
});

module.exports.validateCategoryExistent = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { category } = res.locals;
    let filters = {
      $or: [
        {
          'name.en': name.en,
        },
        {
          'name.ar': name.ar,
        },
      ],
    };
    if (category) {
      filters['_id'] = { $ne: category._id };
    }
    const exist = await Category.findOne({ ...filters });

    if (!exist) {
      next();
    } else {
      return res.status(409).json({
        message: 'Category already exists',
      });
    }
  } catch (error) {
    next(error);
  }
};
