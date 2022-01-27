import React, { Fragment, useEffect, useState } from "react";
import "./RoomDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getRoomDetails } from "../../actions/roomAction.js";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { newReview } from "../../actions/roomAction";
import { NEW_REVIEW_RESET } from "../../constants/roomConstants";

const RoomDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { room, loading, error } = useSelector((state) => state.roomDetails);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    value: room.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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
    alert.success("Hotel added to wishlist");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("roomId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getRoomDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

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
                <h2>
                  {room.name}, {room.location}
                </h2>
                <h3>Type: {room.category} </h3>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span> ({room.numOfReviews} reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{` ₹ ${room.price}/night`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={checkoutHandler}>Reserve</button>
                  <button
                    disabled={room.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    BOOKMARK
                  </button>
                </div>
                {match.params.fromdate && match.params.todate && (
                  <span>
                    <p>
                      From: {match.params.fromdate} <br />
                      To: {match.params.todate}
                    </p>
                  </span>
                )}
                <p>
                  Status:
                  <b className={room.Stock < 1 ? "redColor" : "greenColor"}>
                    {room.Stock < 1 ? " Unavailable" : " Available"}{" "}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Amenities: <p>{room.amenity}</p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{room.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                SUBMIT REVIEW
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

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
