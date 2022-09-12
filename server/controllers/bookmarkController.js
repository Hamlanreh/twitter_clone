const Bookmark = require('../models/bookmarkModel');
const Factory = require('./controllerFactory');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const httpStatusCodes = require('../utils/httpStatusCodes');

exports.filterBookmarkData = catchAsync(async (req, res, next) => {
  req.body.tweet = req.params.id;
  next();
});

exports.getUserId = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  next();
});

exports.getMyBookmarks = catchAsync(async (req, res, next) => {
  // Advanced api query features
  const apiFeatures = new APIFeatures(
    Bookmark.find({ user: req.body.user }),
    req.query
  )
    .filter({ ...req.query })
    .sort()
    .fields()
    .paginate();
  // console.log(apiFeatures);

  const query = apiFeatures.query.populate(['user', 'tweet']);
  const docs = await apiFeatures.query;

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

exports.createBookmark = Factory.createOne(Bookmark);
exports.getBookmark = Factory.getOne(Bookmark, { path: 'user' });
exports.deleteBookmark = Factory.deleteOne(Bookmark);
