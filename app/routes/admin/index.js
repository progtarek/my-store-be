const router = require('express').Router({ mergeParams: true });

router.use('/auth', require('./admin-auth.route'));

module.exports = router;
