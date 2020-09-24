const router = require('express').Router();

// Validations
const {
  validateAdminSignup,
} = require('../../middleware/validation/admin/admin-auth.validation');

// Controllers
const { signup } = require('../../controllers/admin/admin-auth.ctrl');

router.post('/signup', validateAdminSignup, signup);

module.exports = router;
