const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

exports.getReviewStats = catchAsync(async (req, res, next) => {
  const stats = await Review.aggregate([
    {
      $match: { rating: { $gte: 1 } },
    },
    {
      $group: {
        _id: '$tour',
        num: { $sum: 1 },
        avgRatings: { $avg: '$rating' },
      },
    },
    {
      $sort: { rating: 1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
