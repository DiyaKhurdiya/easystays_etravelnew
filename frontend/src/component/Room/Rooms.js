import React, { Fragment, useEffect, useState } from "react";
import "./Rooms.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getRoom } from "../../actions/roomAction";
import Loader from "../layout/Loader/Loader";
import RoomCard from "../Home/RoomCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";

const categories = ["Single", "Double", "Duplex"];
const Rooms = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { rooms, loading, error, roomsCount, resultPerPage } = useSelector(
    (state) => state.rooms
  );
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getRoom(currentPage, price, category, ratings));
  }, [dispatch, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="roomsHeading">Hotels</h2>

          <div className="rooms">
            {rooms &&
              rooms.map((room) => <RoomCard key={room._id} room={room} />)}
          </div>

          <div className="filterBox">
            <Typography variant="h5">Price</Typography>
            <Slider
              className="slider"
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
          </div>

          {/* <div className='filterBox1'>
    <Typography variant='h5'>Type</Typography>
    <select className='custom-select' id='' onChange={setCategoryType}>
        <option value="single">single</option>
        <option value="double">double</option>
        
    </select>
    </div> */}
          <div className="filterBox1">
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="filterBox2">
            <Typography variant="h5" component="legend">
              Hotel Ratings
            </Typography>
            <Slider
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={5}
            />
          </div>

          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={roomsCount}
              onChange={setCurrentPageNo}
              nextPageText="NEXT"
              prevPageText="PREV"
              firstPageText="FIRST"
              lastPageText="LAST"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Rooms;
