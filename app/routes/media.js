const router = require('express').Router({ mergeParams: true });
const uploadMedia = require('../utils/media-upload');
const multer = require('../utils/multer');

router.post('/upload', multer.array('image'), uploadMedia);

module.exports = router;
