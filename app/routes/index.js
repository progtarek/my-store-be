const router = require('express').Router({ mergeParams: true });

router.use('/admins', require('./admin'));
router.use('/users', require('./user'));
router.use('/media', require('./media'));

module.exports = router;
