const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create new booking
exports.newBooking = catchAsyncErrors(async (req, res, next) => {
  const {
    roomName,
    room,
    fromdate,
    todate,
    totalDays,
    totalAmount,
    quantity,
    address,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    roomName,
    room,
    fromdate,
    todate,
    totalDays,
    totalAmount,
    quantity,
    address,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    booking,
  });
});

// get Single Booking
exports.getSingleBooking = catchAsyncErrors(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!booking) {
    return next(new ErrorHandler("Booking not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    booking,
  });
});

// get logged in user  Bookings
exports.myBookings = catchAsyncErrors(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    bookings,
  });
});

// update Booking Status -- Admin
exports.updateBooking = catchAsyncErrors(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorHandler("Booking not found with this Id", 404));
  }

  if (booking.bookingStatus === "Booked") {
    return next(new ErrorHandler("You have already booked this room", 400));
  }

  if (req.body.status === "Booked") {
    booking.bookings.forEach(async (o) => {
      await updateStock(o.room, o.quantity);
    });
  }
  booking.bookings = req.body.status;

  if (req.body.status === "Booked") {
    booking.bookedAt = Date.now();
  }

  await booking.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const room = await Room.findById(id);

  room.Stock -= quantity;

  await room.save({ validateBeforeSave: false });
}

// delete Booking -- Admin
exports.deleteBooking = catchAsyncErrors(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorHandler("Booking not found with this Id", 404));
  }

  await booking.remove();

  res.status(200).json({
    success: true,
  });
});
