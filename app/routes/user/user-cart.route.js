const router = require('express').Router();
const passport = require('passport');

// Validations
const {
  validateCartSchema,
} = require('../../middleware/validation/user/user-cart.validation');

// Finds
const findUserCart = require('../../middleware/finds/findUserCart');
const findProductsByIds = require('../../middleware/finds/findProductsByIds');

// Controllers
const { create, read } = require('../../controllers/user/user-cart.ctrl');

router.get(
  '/',
  passport.authenticate('jwt-user', { session: false }),
  findUserCart,
  read
);

router.post(
  '/',
  passport.authenticate('jwt-user', { session: false }),
  validateCartSchema,
  findProductsByIds,
  findUserCart,
  create
);

module.exports = router;
