const { celebrate, Joi } = require('celebrate');

// module.exports.validateAdminSignup = celebrate({
//   body: Joi.object().keys({
//     firstName: Joi.string().min(3).max(20).required(),
//     lastName: Joi.string().min(3).max(20).required(),
//     password: Joi.string().min(8).max(20).required(),
//     email: Joi.string().email().required(),
//     username: Joi.string()
//       .min(4)
//       .required()
//       .regex(/^[a-zA-Z0-9.\-_$@*!]{4,30}$/),
//   }),
// });

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    password: Joi.string().min(8).max(20).required(),
    email: Joi.string().email().required(),
  }),
});
