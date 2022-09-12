const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    lowercase: true,
    required: [true, 'User must provide firstname'],
  },
  lastname: {
    type: String,
    lowercase: true,
    required: [true, 'User must provide lastname'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'User must provide username'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'User must provide email address'],
    validate: [validator.isEmail, 'Provide a valid email address'],
  },
  dob: {
    type: Date,
    required: [true, 'User must provide date of birth'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'User must have a creation date'],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'User must provide password'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'User must confirm password'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Ensure the passowrd and confirmation are the same',
    },
  },
  bio: String,
  bgImg: String,
  profileImg: String,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  // Find active user only
  this.find({ active: true });
  next();
});

userSchema.pre(/^find/, function (next) {
  this.select('-__v ');
  next();
});

userSchema.methods.isCorrectPassword = async function (
  password,
  hashedPassword
) {
  return await bcrypt.compare(password, hashedPassword);
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetPasswordToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetPasswordToken)
    .digest('hex');
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetPasswordToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
