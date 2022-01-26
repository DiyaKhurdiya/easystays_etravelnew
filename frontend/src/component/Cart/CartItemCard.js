import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/room/${item.room}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <span>
          <p onClick={() => deleteCartItems(item.room)}>Remove</p>
        </span>
      </div>
    </div>
  );
};

export default CartItemCard;
