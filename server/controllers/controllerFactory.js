const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const httpStatusCodes = require('../utils/httpStatusCodes');

exports.getAll = (Model, ...allowedFields) =>
  catchAsync(async (req, res, next) => {
    // Advanced api query features
    const apiFeatures = new APIFeatures(Model.find(), req.query)
      .filter({ ...req.query }, ...allowedFields)
      .sort()
      .fields()
      .paginate();
    // console.log(apiFeatures);
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

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    if (!newDoc)
      return next(
        new AppError(
          'Provide all document information',
          httpStatusCodes.BAD_REQUEST
        )
      );

    res.status(httpStatusCodes.CREATED).json({
      status: 'success',
      data: newDoc,
    });
  });

exports.getOne = (Model, populateOption) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOption) query = query.populate(populateOption);
    const doc = await query;

    if (!doc)
      return next(
        new AppError(
          'No document found with that ID',
          httpStatusCodes.NOT_FOUND
        )
      );

    res.status(httpStatusCodes.OK).json({
      status: 'success',
      data: doc,
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc)
      return next(
        new AppError(
          'No document found with that ID',
          httpStatusCodes.NOT_FOUND
        )
      );

    res.status(httpStatusCodes.OK).json({
      status: 'success',
      data: doc,
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc)
      return next(
        new AppError(
          'No document found with that ID',
          httpStatusCodes.NOT_FOUND
        )
      );

    res.status(httpStatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  });
