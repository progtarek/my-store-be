const router = require('express').Router({ mergeParams: true });

router.use('/auth', require('./admin-auth.route'));
router.use('/category', require('./admin-category.route'));
router.use('/product', require('./admin-product.route'));

module.exports = router;
