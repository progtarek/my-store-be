const router = require('express').Router({ mergeParams: true });

router.use('/admins', require('./admin'));
router.use('/media', require('./media'));

module.exports = router;
