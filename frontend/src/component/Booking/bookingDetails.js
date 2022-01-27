import React, { Fragment, useEffect } from "react";
import "./bookingDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getBookingDetails, clearErrors } from "../../actions/bookingAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const BookingDetails = ({ match }) => {
  const { booking, error, loading } = useSelector(
    (state) => state.bookingDetails
  );

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getBookingDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Booking Details" />
          <div className="bookingDetailsPage">
            <div className="bookingDetailsContainer">
              <Typography component="h1">
                Booking #{booking && booking._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="bookingDetailsContainerBox">
                <div>
                  <p>
                    Name:
                    <span>{booking?.user && booking.user.name}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Phone:
                    <span>
                      {booking.shippingInfo && booking.shippingInfo.phoneNo}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Address:
                    <span>
                      {booking.shippingInfo &&
                        `${booking.shippingInfo.address}, ${booking.shippingInfo.city}, ${booking.shippingInfo.state}, ${booking.shippingInfo.pinCode}, ${booking.shippingInfo.country}`}
                    </span>
                  </p>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="bookingDetailsContainerBox">
                <div>
                  <p
                    className={
                      booking.paymentInfo &&
                      booking.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {booking.paymentInfo &&
                    booking.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>
                    Amount:
                    <span>₹{booking.totalPrice && booking.totalPrice}</span>
                  </p>
                </div>
              </div>

              <Typography>Booking Status</Typography>
              <div className="bookingDetailsContainerBox">
                <div>
                  <p
                    className={
                      booking.bookingStatus &&
                      booking.bookingStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {booking.bookingStatus && booking.bookingStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="bookingDetailsCartItems">
              <Typography>Booking Items:</Typography>
              <div className="bookingDetailsCartItemsContainer">
                {booking.bookingItems &&
                  booking.bookingItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BookingDetails;
