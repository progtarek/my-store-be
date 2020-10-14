const router = require('express').Router();
const passport = require('passport');

// Validations
const {
  validateCartSchema,
} = require('../../middleware/validation/user/user-cart.validation');

// Finds
const findUserCart = require('../../middleware/finds/findUserCart');
const findProductsByIds = require('../../middleware/finds/findProductsByIds');
const findItemInCart = require('../../middleware/finds/findItemInCart');

// Controllers
const {
  create,
  read,
  remove,
} = require('../../controllers/user/user-cart.ctrl');

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

router.delete(
  '/:_id',
  passport.authenticate('jwt-user', { session: false }),
  findItemInCart,
  remove
);

module.exports = router;
