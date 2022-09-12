const { Readable } = require('stream');
const cloudinary = require('./cloudinary');
const AppError = require('./appError');
const httpStatusCodes = require('./httpStatusCodes');

const bufferToStream = buffer => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};

// Promsified version
const streamUpload = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          reject(
            new AppError('Image upload failed', httpStatusCodes.BAD_REQUEST)
          );
        } else {
          resolve(result);
        }
      }
    );

    bufferToStream(buffer).pipe(stream);
  });
};

module.exports = streamUpload;
