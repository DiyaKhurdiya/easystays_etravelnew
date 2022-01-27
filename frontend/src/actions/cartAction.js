import axios from "axios";
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
     SAVE_SHIPPING_INFO,
  } from "../constants/cartConstants";

  //Add to Cart

  export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
      const { data } = await axios.get(`/api/v1/room/${id}`);
      dispatch({ 
        type: ADD_TO_CART,
        payload: {
            room: data.room._id,
            name: data.room.name,
            price: data.room.price,
            image: data.room.images[0].url,
            stock: data.room.Stock,
            quantity,
        },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
// Remove from cart
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};