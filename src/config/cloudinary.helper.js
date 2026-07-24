const cloudinary = require('../config/cloudinary')
  
  const uploadToCloudinary = (buffer,id) => {
      return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
      {
        folder: "rentflow/buildings",
        public_id: `building_${id}_cauvery_bill`,
        overwrite: true
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);

  });
};

module.exports = {uploadToCloudinary}