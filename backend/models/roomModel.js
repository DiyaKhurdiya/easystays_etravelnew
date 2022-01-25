const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hotel name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Hotel description"],
  },
  amenity: {
    type: String,
    required: [true, "Hotel amenities"],
  },
  location: {
    type: String,
    required: [true, "Hotel location"],
  },
  price: {
    type: Number,
    required: [true, 500],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter no. of rooms available"],
    maxLength: [3, "Number of rooms cannot exceed 4 characters"],
    default: 1,
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true, "This is a sample Id"],
      },
      url: {
        type: String,
        required: [true, "Sample url"],
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Hotel category"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", roomSchema);
