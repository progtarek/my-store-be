const router = require('express').Router({ mergeParams: true });

router.use('/admins', require('./admin'));

module.exports = router;
