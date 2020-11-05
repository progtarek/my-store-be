const router = require('express').Router();
const passport = require('passport');

// Validations
const {
  validateCategorySchema,
  validateCategoryExistent,
} = require('../../middleware/validation/admin/admin-category.validation');
const validateReadManyDocuments = require('../../middleware/commons/joi/validateReadManyDocuments');

// Finds
const findCategory = require('../../middleware/finds/findCategoryById');

// Controllers
const {
  create,
  update,
  readAll,
  remove,
  readById,
} = require('../../controllers/admin/admin-category.ctrl');

router.get(
  '/',
  passport.authenticate('jwt-admin', { session: false }),
  validateReadManyDocuments,
  readAll
);

router.get(
  '/:_id',
  passport.authenticate('jwt-admin', { session: false }),
  findCategory,
  readById
);

router.post(
  '/',
  passport.authenticate('jwt-admin', { session: false }),
  validateCategorySchema,
  validateCategoryExistent,
  create
);

router.patch(
  '/:_id',
  passport.authenticate('jwt-admin', { session: false }),
  validateCategorySchema,
  findCategory,
  validateCategoryExistent,
  update
);

router.delete(
  '/:_id',
  passport.authenticate('jwt-admin', { session: false }),
  findCategory,
  remove
);

module.exports = router;
