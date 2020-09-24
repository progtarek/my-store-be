const router = require('express').Router();

router.get('/signup', (req, res, next) => {
  res.status(200).send('Hello from the other side');
});

module.exports = router;
