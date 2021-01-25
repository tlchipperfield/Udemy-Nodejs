const mongoose = require('mongoose');
const validator = require('validator');

// name, email, photo, password, passwordConfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A username is needed'],
    unique: true,
    trim: true,
    maxlength: [16, 'A username must have less or equal then 16 character'],
    minlength: [6, 'A username must have more or equal then 6 character'],
    // validate: [validator.isAlpha, 'Tour name must only contain characters.'],
  },
  email: {
    type: String,
    required: [true, 'An email address is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    maxlength: [30, 'A 30 character limit is allowed.'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'A password is required'],
    minlength: [8, 'You need atleast 8 characters in the password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
});
const User = mongoose.model('User', userSchema);

module.exports = User;
