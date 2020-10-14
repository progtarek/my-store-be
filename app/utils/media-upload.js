const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: 'auto',
        folder: folder,
      },
      (err, result) => {
        // resolve({
        //   url: result.url,
        //   id: result.public_id,
        // });
        resolve(result.public_id);
      }
    );
  });
};

module.exports = async (req, res, next) => {
  try {
    const uploader = async (path) => await uploadImage(path, 'my-store');

    const urls = [];
    const files = req.files;
    if (files && files.length) {
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
    }

    res.status(200).json(urls);
  } catch (error) {
    next(error);
  }
};
