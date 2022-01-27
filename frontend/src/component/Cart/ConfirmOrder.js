import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { removeItemsFromCart } from "../../actions/cartAction";

const ConfirmOrder = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const address = `${shippingInfo.state}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
    };

    sessionStorage.setItem("bookingInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Booking" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Your Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Email:</p>
                <span>{user.email}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Country/Region:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Selected Hotel:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.room}>
                    <img src={item.image} alt="Room" />
                    <Link to={`/room/${item.room}`}>{item.name}</Link>{" "}
                    <p>
                      Subtotal:<span>₹{subtotal}</span>
                    </p>
                    <p onClick={() => deleteCartItems(item.room)}>Remove</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="orderSummary">
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
        {/*  */}
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
