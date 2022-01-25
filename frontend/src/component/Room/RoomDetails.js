import React, { Fragment, useEffect, useState } from "react";
import "./RoomDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getRoomDetails } from "../../actions/roomAction.js";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import {addItemsToCart} from "../../actions/cartAction";

const RoomDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { room, loading, error } = useSelector((state) => state.roomDetails);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (room.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Hotel Booked! Kindly proceed to payment");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getRoomDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: room.rating,
    isHalf: true,
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="RoomDetails">
            <div>
              {room.images &&
                room.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{room.name}, {room.location}</h2>
                <h3>{room.category} Type</h3>    
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span> ({room.numOfReviews} reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{` ₹ ${room.price}/ night`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Book Rooms</button>
                </div>

                <p>
                  Status:
                  <b className={room.Stock < 1 ? "redColor" : "greenColor"}>
                    {room.Stock < 1 ? "OutOfStock" : "InStock"}{" "}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Amenities: <p>{room.description}</p>
              </div>
              <button className="submitReview">Submit review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          {room.reviews && room.reviews[0] ? (
            <div className="reviews">
              {room.reviews &&
                room.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default RoomDetails;
