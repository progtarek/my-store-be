const router = require('express').Router({ mergeParams: true });

router.use('/auth', require('./auth'));

module.exports = router;
