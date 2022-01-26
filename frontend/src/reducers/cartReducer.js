import {ADD_TO_CART,
     REMOVE_CART_ITEM,
    // SAVE_SHIPPING_INFO,
    // CART_EMPTY
  } from "../constants/cartConstants";
    
  export const cartReducer = (
    state = { cartItems: [], },
    action) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
  
        const isItemExist = state.cartItems.find(
          (i) => i.room === item.room
        );
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.room === isItemExist.room ? item : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }

        case REMOVE_CART_ITEM:
          return {
            ...state,
            cartItems: state.cartItems.filter((i) => i.room !== action.payload),
          };
      default:
          return state;
    }
};