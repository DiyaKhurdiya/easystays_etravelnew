import React, {Fragment,} from 'react';
import "./Cart.css";
import CartItemCard from './CartItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart } from '../../actions/cartAction';
const Cart = () => {
    const dispatch = useDispatch();
   
    const {cartItems} = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
          return;
        }
        dispatch(addItemsToCart(id, newQty));
      };
    
      const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
          return;
        }
        dispatch(addItemsToCart(id, newQty));
      };
    
  return (
      <Fragment>
          <div className='cartPage'>
              <div className='cartHeader'>
                  <p>Hotel</p>
                  <p>Rooms</p>
                  <p>Subtotal</p>
              </div>
              {cartItems && cartItems.map((item) => (
                  <div className='cartContainer'>
                  <CartItemCard item={item}/>
                  <div className='cartInput'>
                      <button>-</button>
                      <input type="number" value={item.quantity} readOnly/>
                      <button onClick={() =>
                        increaseQuantity(
                          item.room,
                          item.quantity,
                          item.stock
                        )}>+</button>
                  </div>
                  <p className='cartSubtotal'>{`₹${item.price*item.quantity}`}</p>
              </div>
              ))}

              <div className='cartGrossProfit'>
                  <div>
                    
                  </div>
                  <div className='cartGrossProfitBox'>
                      <p>Gross Total</p>
                      <p>{`₹600`}</p>
                  </div>
                  <div className='checkOutButton'>
                      <button> Check Out</button>
                  </div>
              </div>
          </div>
      </Fragment>
  );
};

export default Cart;
