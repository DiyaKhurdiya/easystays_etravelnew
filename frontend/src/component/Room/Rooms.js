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
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
const categories = ["Single", "Double", "Duplex"];
const amenities = [
  "Swimming pool",
  "Car parking",
  "Free Wifi",
  "Pets allowed",
  "Gym",
  "Spa",
  "Dance Hall",
  "Bar",
];
const locations = [
  "Agartala",
  "Agra",
  "Ahmedabad",
  "Ahmednagar",
  "Aizawl",
  "Ajmer",
  "Akola",
  "Aligarh",
  "Allahabad",
  "Alwar",
  "Ambarnath",
  "Ambattur",
  "Amravati",
  "Amritsar",
  "Anantapur",
  "Anantapuram",
  "Arrah",
  "Asansol",
  "Aurangabad",
  "Avadi",
  "Bally",
  "Bangalore",
  "Baranagar",
  "Barasat",
  "Bardhaman",
  "Bareilly",
  "Bathinda",
  "Begusarai",
  "Belgaum",
  "Bellary",
  "Berhampur",
  "Bhagalpur",
  "Bharatpur",
  "Bhatpara",
  "Bhavnagar",
  "Bhilai",
  "Bhilwara",
  "Bhiwandi",
  "Bhopal",
  "Bhubaneswar",
  "BiharSharif",
  "Bijapur",
  "Bikaner",
  "Bilaspur",
  "Bokaro",
  "Chandigarh",
  "Chandrapur",
  "Chennai",
  "Coimbatore",
  "Cuttack",
  "Darbhanga",
  "Davanagere",
  "Dehradun",
  "Delhi",
  "Dewas",
  "Dhanbad",
  "Dhule",
  "Durg",
  "Durgapur",
  "Eluru",
  "Erode",
  "Etawah",
  "Faridabad",
  "Farrukhabad",
  "Firozabad",
  "Gandhidham",
  "Gaya",
  "Ghaziabad",
  "Gopalpur",
  "Gorakhpur",
  "Gulbarga",
  "Guntur",
  "Gurgaon",
  "Guwahati",
  "Gwalior",
  "Hapur",
  "Haridwar",
  "Howrah",
  "Hubli-Dharwad",
  "Hyderabad",
  "Ichalkaranji",
  "Imphal",
  "Indore",
  "Jabalpur",
  "Jaipur",
  "Jalandhar",
  "Jalgaon",
  "Jalna",
  "Jammu",
  "Jamnagar",
  "Jamshedpur",
  "Jhansi",
  "Jodhpur",
  "Junagadh",
  "Kadapa",
  "Kakinada",
  "Kalyan-Dombivli",
  "Kamarhati",
  "Kanpur",
  "Karimnagar",
  "Karnal",
  "Karur",
  "Khammam",
  "Kirari",
  "Kochi",
  "Kolhapur",
  "Kolkata",
  "Kollam",
  "Korba",
  "Kota",
  "Kozhikode",
  "Kulti",
  "Kurnool",
  "Latur",
  "Loni",
  "Lucknow",
  "Ludhiana",
  "Madurai",
  "Maheshtala",
  "Malegaon",
  "Mangalore",
  "Mathura",
  "Mau",
  "Meerut",
  "Mira-Bhayandar",
  "Mirzapur",
  "Moradabad",
  "Muzaffarnagar",
  "Muzaffarpur",
  "Mysore",
  "Nagpur",
  "Nanded",
  "Nashik",
  "Navi" - "Mumbai",
  "Nellore",
  "New-Delhi",
  "Nizamabad",
  "Noida",
  "North-Dumdum",
  "Pali",
  "Panihati",
  "Panipat",
  "Parbhani",
  "Patna",
  "Pimpri-Chinchwad",
  "Pondicherry",
  "Pune",
  "Purnia",
  "Raichur",
  "Raipur",
  "Rajahmundry",
  "Rajkot",
  "  Rajpur-Sonarpur",
  "  Ramagundam",
  "Rampur",
  "Ranchi",
  "Ratlam",
  "Rewa",
  "Rohtak",
  "Rourkela",
  "Sagar",
  "Saharanpur",
  "Salem",
  "Sambalpur",
  "Sangli-Miraj & Kupwad",
  "Satara",
  "Satna",
  "Shahjahanpur",
  "Shimoga",
  "Sikar",
  "Silchar",
  "Siliguri",
  "Solapur",
  "Sonipat",
  "Srinagar",
  "Surat",
  "Tenali",
  "Thane",
  "Thiruvananthapuram",
  "Thoothukudi",
  "Thrissur",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupati",
  "Tiruppur",
  "Tiruvottiyur",
  "Tumkur",
  "Udaipur",
  "Ujjain",
  "Ulhasnagar",
  "Uzhavarkarai",
  "Vadodara",
  "Varanasi",
  "Vasai-Virar",
  "Vijayanagaram",
  "Vijayawada",
  "Visakhapatnam",
  "Warangal",
];

const Rooms = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [location, setLocation] = useState("");
  const [amenity, setAmenity] = useState("");
  const [ratings, setRatings] = useState(0);

  const { rooms, loading, error, roomsCount, resultPerPage } = useSelector(
    (state) => state.rooms
  );

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const setCategoryType = (e) => {
    setCategory(e.target.value);
  };

  const setLocationType = (e) => {
    setLocation(e.target.value);
  };

  const setAmenityType = (e) => {
    setAmenity(e.target.value);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  function filterByDate(dates) {
    setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
    settodate(moment(dates[1]).format("DD-MM-YYYY"));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(
      getRoom(keyword, currentPage, price, category, ratings, location, amenity)
    );
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    ratings,
    location,
    amenity,
    alert,
    error,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <RangePicker
            style={{ height: "38px" }}
            format="DD-MM-YYYY"
            onChange={filterByDate}
            className="m-2"
          />
          <div className="rooms">
            {rooms &&
              rooms.map((room) => (
                <RoomCard
                  key={room._id}
                  room={room}
                  fromdate={fromdate}
                  todate={todate}
                />
              ))}
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

          <div className="filterBox1">
            <Typography variant="h5">Type</Typography>
            <select
              className="categoryBox"
              value={category}
              onChange={setCategoryType}
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
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

          <div className="filterBox4">
            <Typography variant="h5">Location</Typography>
            <select
              className="locationBox"
              value={location}
              onChange={setLocationType}
            >
              <option value="">All</option>
              {locations.map((location) => (
                <option value={location} key={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="filterBox5">
            <Typography variant="h5">Amenities</Typography>
            <select
              className="amenityBox"
              value={amenity}
              onChange={setAmenityType}
            >
              <option value="">All</option>
              {amenities.map((amenity) => (
                <option value={amenity} key={amenity}>
                  {amenity}
                </option>
              ))}
            </select>
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
