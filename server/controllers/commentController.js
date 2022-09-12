const Comment = require('../models/commentModel');
const Factory = require('./controllerFactory');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const httpStatusCodes = require('../utils/httpStatusCodes');

exports.filterCommentData = catchAsync(async (req, res, next) => {
  req.body.post = req.params.id;
  next();
});

exports.getUserId = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  next();
});

exports.getAllPostComments = catchAsync(async (req, res, next) => {
  // Advanced api query features
  const apiFeatures = new APIFeatures(
    Comment.find({ post: req.params.id }),
    req.query
  )
    .filter({ ...req.query }, 'comment')
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

exports.createComment = Factory.createOne(Comment);
exports.getComment = Factory.getOne(Comment);
exports.updateComment = Factory.updateOne(Comment);
exports.deleteComment = Factory.deleteOne(Comment);
