import React, { Fragment, useEffect } from "react";
import "./Home.css";
import RoomCard from "./RoomCard.js";
import MetaData from "../layout/MetaData.js";
import { getRoom, clearErrors } from "../../actions/roomAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

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
          <div className="banner"></div>
          <h2 className="homeHeading">FEATURED ROOMS</h2>
          <div className="container" id="container">
            {rooms &&
              rooms.map((room) => <RoomCard key={room._id} room={room} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
