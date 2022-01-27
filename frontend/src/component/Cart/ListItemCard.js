import React from "react";
import "./ListItemCard.css";
import { Link } from "react-router-dom";

const ListItemCard = ({ item, deleteListItems }) => {
  return (
    <div className="ListItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/room/${item.room}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteListItems(item.room)}>Remove</p>
      </div>
    </div>
  );
};

export default ListItemCard;
