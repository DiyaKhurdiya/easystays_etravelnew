import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./bookingSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const BookingSuccess = () => {
  return (
    <div className="bookingSuccess">
      <CheckCircleIcon />

      <Typography>Hotel has been booked successfully </Typography>
      <Link to="/bookings">View Bookings</Link>
    </div>
  );
};

export default BookingSuccess;

