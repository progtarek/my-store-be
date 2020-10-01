const { Joi, celebrate } = require('celebrate');

module.exports = celebrate({
  params: {
    page: Joi.number().min(1).default(1).optional(),
    limit: Joi.number().min(2).default(10).optional(),
  },
});
