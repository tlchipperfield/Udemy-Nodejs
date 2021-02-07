const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// name, email, photo, password, passwordConfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A username is needed'],
    trim: true,
    maxlength: [16, 'A username must have less or equal then 16 character'],
    minlength: [5, 'A username must have more or equal then 5 character'],
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
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'The passwords are not the same.',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was modified.
  if (!this.isModified('password')) return next();
  // has the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete the password confirm field.
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
