import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Room from "./RoomCard.js";
import MetaData from "../layout/MetaData.js";
import { getRoom, clearErrors } from "../../actions/roomAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import image1 from "../Home/images/room.png";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, rooms } = useSelector((state) => state.rooms);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getRoom());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Welcome to EasyStays.com!" />
          <img src="" alt=""></img>
          <div className="banner">
            <div className="slider">
              <div className="slider-image">
                <img src={image1} alt="" />
              </div>
              <input type="radio" name="radio-btn" />
              <input type="radio" name="radio-btn" />
              <input type="radio" name="radio-btn" />
            </div>
          </div>
          <h2 className="homeHeading">FEATURED ROOMS</h2>
          <div className="container" id="container">
            {rooms && rooms.map((room) => <Room room={room} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
