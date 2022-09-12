const Tweet = require('../models/tweetModel');
const Factory = require('./controllerFactory');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const httpStatusCodes = require('../utils/httpStatusCodes');
const filterFields = require('../utils/filterFields');

exports.filterRetweetData = (req, res, next) => {
  req.body = filterFields(req.body, 'text');
  req.body.tweet = req.params.id;
  req.body.isRetweet = true;
  next();
};

exports.getUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

exports.getAllTweetRetweets = catchAsync(async (req, res, next) => {
  // Advanced api query features
  const apiFeatures = new APIFeatures(
    Tweet.find({ tweet: req.params.id, isRetweet: true }),
    req.query
  )
    .filter({ ...req.query })
    .sort()
    .fields()
    .paginate();
  // console.log(apiFeatures);

  const query = apiFeatures.query.populate({ path: 'user' });
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

exports.createRetweet = Factory.createOne(Tweet);
exports.getRetweet = Factory.getOne(Tweet);
exports.updateRetweet = Factory.updateOne(Tweet);
exports.deleteRetweet = Factory.deleteOne(Tweet);
