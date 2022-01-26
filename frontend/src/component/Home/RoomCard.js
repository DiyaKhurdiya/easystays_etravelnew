import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const RoomCard = ({ room, fromdate, todate }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: room.ratings,
    isHalf: true,
  };

  return (
    <Link className="roomCard" to={`/room/${room._id}`}>
      <div className="roomBadge">
        <button
          className={room.Stock < 3 ? "roomBadgeLowStock" : "roomNoBadge"}
        >
          {room.Stock < 3 ? "Few rooms left" : ""}
        </button>
        <button
          className={
            room.price < 1500 && room.ratings > 4
              ? "roomBadgeBest"
              : "roomNoBadge"
          }
        >
          {room.price < 1500 && room.ratings > 4 ? "Value for money" : ""}
        </button>
        <button
          className={
            room.amenity === "City view" ||
            room.amenity === "Beach view" ||
            room.amenity === "Mountain view"
              ? "roomBadgeView"
              : "roomNoBadge"
          }
        >
          {room.amenity === "City view" ||
          room.amenity === "Beach view" ||
          room.amenity === "Mountain view"
            ? "Great view"
            : ""}
        </button>
      </div>
      <img src={room.images[0].url} alt={room.name} />
      <p>{room.name}</p>
      <p>
        {" "}
        <i class="fa fa-map-marker-alt"></i> {room.location}
      </p>
      <div className="category">
        <p>Type: {room.category}</p>
      </div>
      <div>
        <ReactStars {...options} /> <span>({room.numOfReviews} reviews)</span>
      </div>
      <span>{`₹ ${room.price}/night`}</span>
      <div style={{ float: "right" }}>
        {fromdate && todate && (
          <Link to={`/room/${room._id}/${fromdate}/${todate}`}>
            <button>Book Now</button>
          </Link>
        )}
      </div>
    </Link>
  );
};

export default RoomCard;
