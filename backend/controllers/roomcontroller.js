const Room = require("../models/roomModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create room
exports.createRoom = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const room = await Room.create(req.body);

  res.status(201).json({
    success: true,
    room,
  });
});

// Get all rooms
exports.getAllRooms = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 12;
  const roomsCount = await Room.countDocuments();
  const apiFeature = new ApiFeatures(Room.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const rooms = await apiFeature.query;

  res.status(200).json({
    success: true,
    rooms,
    roomsCount,
    resultPerPage,
  });
});

// Get Room details
exports.getRoomDetails = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }

  res.status(200).json({
    success: true,
    room,
  });
});

// Update room
exports.updateRoom = catchAsyncErrors(async (req, res, next) => {
  let room = Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }

  room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

// Delete room
exports.deleteRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }

  await room.remove();

  res.status(200).json({
    success: true,
    message: "Room deleted successfully!",
  });
});

// Create or update review
exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, roomId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);

  const isReviewed = room.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    room.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) rev.rating = rating;
      rev.comment = comment;
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  let avg = 0;

  room.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  room.ratings = avg / room.reviews.length;

  await room.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
  });
});

//Get all reviews
exports.getReviews = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Hotel not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: room.reviews,
  });
});

//Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.roomId);

  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }

  const reviews = room.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Room.findByIdAndUpdate(
    req.query.roomId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Review deleted successfully!",
  });
});
