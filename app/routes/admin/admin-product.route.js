const router = require('express').Router();
const passport = require('passport');

// Validations
const {
  validateProductSchema,
  validateProductExistent,
} = require('../../middleware/validation/admin/admin-product.validation');
const validateReadManyDocuments = require('../../middleware/commons/joi/validateReadManyDocuments');

// Finds
const findProduct = require('../../middleware/finds/findProductById');

// Controllers
const {
  create,
  update,
  readAll,
  remove,
  readById,
} = require('../../controllers/admin/admin-product.ctrl');

router.get(
  '/',
  passport.authenticate('jwt-admin', { session: false }),
  validateReadManyDocuments,
  readAll
);

router.get(
  '/:_id',
  passport.authenticate('jwt-admin', { session: false }),
  findProduct,
  readById
);

router.post(
  '/',
  passport.authenticate('jwt-admin', { session: false }),
  validateProductSchema,
  validateProductExistent,
  create
);

router.patch(
  '/:_id',
  passport.authenticate('jwt-admin', { session: false }),
  validateProductSchema,
  findProduct,
  validateProductExistent,
  update
);

router.delete(
  '/:_id',
  passport.authenticate('jwt-admin', { session: false }),
  findProduct,
  remove
);

module.exports = router;
