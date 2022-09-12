const multer = require('multer');
const sharp = require('sharp');
const Tweet = require('../models/tweetModel');
const Factory = require('./controllerFactory');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const httpStatusCodes = require('../utils/httpStatusCodes');
const filterFields = require('../utils/filterFields');
const streamUpload = require('../utils/streamUpload');

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
exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single('upload');

exports.resizeUpload = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const data = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  // Upload file to the cloud
  const upload = await streamUpload(data, {
    folder: `twitter_clone/tweetUploads/`,
    // public_id: `tweet-${req.user.id}-${file.fieldname}`,
  });

  req.file.filename = upload.url;
  req.body[`${req.file.fieldname}`] = req.file.filename;
  next();
});

exports.filterTweetData = (req, res, next) => {
  req.body = filterFields(req.body, 'text');
  next();
};

exports.getUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

exports.getMyTweets = catchAsync(async (req, res, next) => {
  // Advanced api query features
  const apiFeatures = new APIFeatures(
    Tweet.find({ user: req.body.user, isRetweet: false }),
    req.query
  )
    .filter({ ...req.query }, 'text')
    .sort()
    .fields()
    .paginate();
  // console.log(apiFeatures);

  const query = apiFeatures.query.populate({
    path: 'user',
    select: 'firstname lastname username',
  });
  const docs = await query;

  if (!docs)
    return next(
      new AppError(
        'No document found with that ID',
        httpStatusCodes.BAD_REQUEST
      )
    );

  res.status(httpStatusCodes.OK).json({
    status: 'success',
    length: docs.length,
    data: docs,
  });
});

exports.getAllTweets = catchAsync(async (req, res, next) => {
  // Advanced api query features
  const apiFeatures = new APIFeatures(
    Tweet.find({ isRetweet: false }),
    req.query
  )
    .filter({ ...req.query })
    .sort()
    .fields()
    .paginate();
  // console.log(apiFeatures);

  const query = apiFeatures.query.populate({
    path: 'user',
    select: 'firstname lastname username',
  });
  const docs = await query;

  if (!docs)
    return next(
      new AppError(
        'No document found with that ID',
        httpStatusCodes.BAD_REQUEST
      )
    );

  res.status(httpStatusCodes.OK).json({
    status: 'success',
    length: docs.length,
    data: docs,
  });
});

exports.createTweet = Factory.createOne(Tweet);
exports.getTweet = Factory.getOne(Tweet, { path: 'user' });
exports.updateTweet = Factory.updateOne(Tweet);
exports.deleteTweet = Factory.deleteOne(Tweet);
