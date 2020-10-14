const router = require('express').Router();
const passport = require('passport');

// Validations
const {
  validateUserLogin,
} = require('../../middleware/validation/user/user-auth.validation');

// Finds
const findUserByEmail = require('../../middleware/finds/findUserByEmail');

// Controllers
const { login } = require('../../controllers/user/user-auth.ctrl');

router.post('/login', validateUserLogin, findUserByEmail, login);

module.exports = router;
