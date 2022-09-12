const Tweet = require('../models/tweetModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const httpStatusCodes = require('../utils/httpStatusCodes');

exports.getTweetsAndRetweets = catchAsync(async (req, res, next) => {
  // Advanced api query features
  const apiFeatures = new APIFeatures(Tweet.find(), req.query)
    .filter({ ...req.query })
    .sort()
    .fields()
    .paginate();
  // console.log(apiFeatures);

  const query = apiFeatures.query
    .populate({ path: 'user' })
    .populate({ path: 'tweet', populate: { path: 'user' } });
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
