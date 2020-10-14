const { celebrate, Joi } = require('celebrate');
const Product = require('../../../DB/models/Product');

module.exports.validateProductSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.object().keys({
      en: Joi.string().required().min(3),
      ar: Joi.string().required().min(3),
    }),
    description: Joi.object().keys({
      en: Joi.string().required().min(3),
      ar: Joi.string().required().min(3),
    }),
    category: Joi.string().hex().required(),
    price: Joi.number().min(1).required(),
    offer: Joi.number().optional(),
    productPictures: Joi.any(),
  }),
});

module.exports.validateProductExistent = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { product } = res.locals;
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
    if (product) {
      filters['_id'] = { $ne: product._id };
    }
    const exist = await Product.findOne({ ...filters });

    if (!exist) {
      next();
    } else {
      return res.status(409).json({
        message: 'Product already exists',
      });
    }
  } catch (error) {
    next(error);
  }
};
