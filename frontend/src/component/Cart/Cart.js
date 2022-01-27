import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { removeItemsFromCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";
const Cart = ({ history}) => {
  const dispatch = useDispatch();

  
  const { cartItems } = useSelector((state) => state.cart);

  // const increaseQuantity = (id, quantity, stock) => {
  //   const newQty = quantity + 1;
  //   if (stock <= quantity) {
  //     return;
  //   }
  //   dispatch(addItemsToCart(id, newQty));
  // };

  // const decreaseQuantity = (id, quantity) => {
  //   const newQty = quantity - 1;
  //   if (1 >= quantity) {
  //     return;
  //   }
  //   dispatch(addItemsToCart(id, newQty));
  // };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
    {cartItems.length === 0 ? (
      <div className="emptyList">
        {" "}
        <i className="fas fa-heart-broken fa-3x" aria-hidden="true"></i>{" "}
        <p> No hotels in your wishlist</p>
        <Link to="/rooms">VIEW HOTELS</Link>
      </div>
    ) : (
    <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Hotel</p>
          
          <p>Total</p>
        </div>
        {cartItems &&
          cartItems.map((item) => (
            <div className="cartContainer" key={item.room}>
              <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
              <div className="cartInput">
               <button onClick ={checkoutHandler}>Book now!</button>
               
                {/* <button
                  onClick={() =>
                    decreaseQuantity(item.room, item.quantity, item.stock)
                  }
                >
                  -
                </button>
                <input type="number" value={item.quantity} readOnly />
                <button
                  onClick={() =>
                    increaseQuantity(item.room, item.quantity, item.stock)
                  }
                >
                  +
                </button> */}
              </div>
              <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
            </div>
          ))}

        {/* <div className="cartGrossProfit">
         
          
          <div className="checkOutButton">
            <button> Check Out</button>
          </div>
        </div> */}
      </div>
    </Fragment>
    )}
    </Fragment>
  );
};


export default Cart;
