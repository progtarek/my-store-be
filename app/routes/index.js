const router = require('express').Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  res.status(200).send('hello from the other side');
});

module.exports = router;
