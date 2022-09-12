const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const httpStatusCodes = require('../utils/httpStatusCodes');
const Email = require('../utils/emailBuilder');

const sendToken = (user, statusCode, req, res) => {
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  });

  return res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    dob: new Date(req.body.dob),
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  sendToken(newUser, httpStatusCodes.CREATED, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      new AppError(
        'Provide your email and password',
        httpStatusCodes.BAD_REQUEST
      )
    );

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.isCorrectPassword(password, user.password)))
    return next(
      new AppError(
        'Provide valid email and password',
        httpStatusCodes.NOT_FOUND
      )
    );

  user.password = undefined;
  sendToken(user, httpStatusCodes.OK, req, res);
});

exports.logout = catchAsync((req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() - 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  });

  res.status(httpStatusCodes.OK).json({
    status: 'success',
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new AppError(`You're not logged in`),
      httpStatusCodes.UNAUTHORIZED
    );

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError(`You're not authorized`, httpStatusCodes.UNAUTHORIZED)
    );
  req.user = user;
  next();
});

exports.getMe = catchAsync((req, res, next) => {
  const token = jwt.decode(req.cookies.jwt);
  if (!token)
    return res.status(httpStatusCodes.OK).json({ status: 'success', user: {} });
  req.params.id = token.id;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(
      new AppError('Provide a valid user email', httpStatusCodes.NOT_FOUND)
    );
  const resetPasswordToken = user.generateResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/reset-password/${resetPasswordToken}`;
  await new Email(user, resetPasswordUrl).sendResetPassword();

  res.status(httpStatusCodes.OK).json({
    status: 'success',
    message: 'Reset password token has been successfully sent',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedResetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedResetPasswordToken,
  });
  if (!user)
    return next(
      new AppError('User does not exist', httpStatusCodes.BAD_REQUEST)
    );

  const resetTokenExpiresAt = new Date(
    user.passwordResetTokenExpires
  ).getTime();

  if (Date.now() > resetTokenExpiresAt) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'Your reset password token has expired',
        httpStatusCodes.BAD_REQUEST
      )
    );
  }

  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  sendToken(user, httpStatusCodes.OK, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(
      new Error(
        `You must be logged in to update password`,
        httpStatusCodes.UNAUTHORIZED
      )
    );
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  sendToken(user, httpStatusCodes.OK, req, res);
});

exports.deactivateMe = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(
      new Error(
        `You must be logged in to deactivate account`,
        httpStatusCodes.UNAUTHORIZED
      )
    );
  }

  const deactivatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { active: false },
    {
      new: true,
      runValidators: true,
    }
  );

  // Send Deactivate Message
  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(deactivatedUser, url).sendDeactivateAccount();

  res.status(httpStatusCodes.NO_CONTENT).json({
    status: 'success',
    data: null,
  });
});
