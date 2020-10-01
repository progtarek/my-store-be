const router = require('express').Router();

// Validations
const {
  validateAdminSignup,
  validateAdminLogin,
} = require('../../middleware/validation/admin/admin-auth.validation');

// Finds
const findUserByEmail = require('../../middleware/finds/findUserByEmail');

// Controllers
const { signup, login } = require('../../controllers/admin/admin-auth.ctrl');
const passport = require('passport');

router.post('/signup', validateAdminSignup, signup);
router.post('/login', validateAdminLogin, findUserByEmail, login);

module.exports = router;
