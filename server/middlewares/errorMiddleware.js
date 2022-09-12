const AppError = require('../utils/appError');
const httpStatusCodes = require('../utils/httpStatusCodes');

const handleMongoServerError = () => {
  return new AppError(
    'Duplicate field already exists',
    httpStatusCodes.BAD_REQUEST
  );
};

const handleValidationError = () => {
  return new AppError('Provided invalid data', httpStatusCodes.BAD_REQUEST);
};

const sendProdError = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const sendDevError = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  return res.status(httpStatusCodes.INTERNAL_SERVER).json({
    status: 'error',
    message: 'Something went wrong',
  });
};

module.exports = (err, req, res, next) => {
  console.error(`Application Error: ${err.name} 💥💥💥`);

  if (process.env.NODE_ENV === 'production') sendProdError(err, req, res);

  if (process.env.NODE_ENV === 'development') {
    if (err.name === 'MongoServerError') err = handleMongoServerError();
    if (err.name === 'ValidationError') err = handleValidationError();
    sendDevError(err, req, res);
  }
};
