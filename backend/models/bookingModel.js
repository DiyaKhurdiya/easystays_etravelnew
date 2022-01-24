const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    address: {
      country: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: Number,
        required: true,
      },
    },
    roomName: {
      type: String,
      required: true,
    },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    fromdate: {
      type: String,
      required: true,
    },
    todate: {
      type: String,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    paidAt: {
      type: Date,
      required: true,
    },
    bookingStatus: {
      type: String,
      required: true,
      default: "booked",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
