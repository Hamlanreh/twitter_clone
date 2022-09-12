const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const Factory = require('./controllerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const streamUpload = require('../utils/streamUpload');
const filterFields = require('../utils/filterFields');
const httpStatusCodes = require('../utils/httpStatusCodes');

exports.filterUpdateData = (req, res, next) => {
  req.body = filterFields(
    req.body,
    'firstname',
    'lastname',
    'username',
    'dob',
    'bio'
  );
  if (req.file) req.body.photo = req.file.filename;
  next();
};

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Please upload user image', httpStatusCodes.BAD_REQUEST),
      false
    );
  }
};

exports.uploads = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).any('profileImg', 'bgImg');

exports.resizeUploads = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  req.files.forEach(async file => {
    // Process the image to buffer
    const data = await sharp(file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();

    // Upload file to the cloud
    const upload = await streamUpload(data, {
      folder: `twitter_clone/${file.fieldname}Uploads/`,
      public_id: `user-${req.user.id}-${file.fieldname}`,
    });

    req.file.filename = upload.url;
    req.body[`${file.fieldname}`] = req.file.filename;
  });
  next();
});

exports.getAllUsers = Factory.getAll(User);
exports.getUser = Factory.getOne(User);
exports.updateUser = Factory.updateOne(User);
exports.deleteUser = Factory.deleteOne(User);
