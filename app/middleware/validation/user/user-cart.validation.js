const { celebrate, Joi } = require('celebrate');

module.exports.validateCartSchema = celebrate({
  body: Joi.object().keys({
    items: Joi.array().items(
      Joi.object().keys({
        product: Joi.string().hex().required(),
        quantity: Joi.number().required(),
      })
    ),
  }),
});
