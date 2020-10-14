const router = require('express').Router({ mergeParams: true });

router.use('/cart', require('./user-cart.route'));
router.use('/auth', require('./user-auth.route'));

module.exports = router;
