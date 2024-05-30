import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import CartItemUnit from './CartItemUnit'

const CartItems = () => {
    
    // Chuyển hướng đến trang checkout
    const handleCheckout = () => {
      // Check Login
        if (!localStorage.getItem('auth-token')) {
          alert('You need to login to view cart');
          window.location.href = '/login';
          return;
      }
      // Check Cart
      if (Object.keys(cartItems).length === 1) {
          alert('Your cart is empty');
          return;
      }
        window.location.href = '/checkout';
    }

    const {getTotalCartAmount, all_product, cartItems} = useContext(ShopContext);
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
      
      <div className="cartitems-left">
      <div className="title-cart">
        <h1>Your Cart</h1>
      </div>
      <div className="Items-cart">
      {all_product.map((e, index)=>{
        if(e.id in cartItems)
        {
            return <CartItemUnit key={index} props={e} quantity={cartItems[e.id]}/> 
        }
        else
        return null;
      })}
      </div>
      
        </div>

        <div className="cartitems-right">
        <div className="cartitems-total">
            <div>
              <div className="cartitems-total-item">
                <p>Subtatal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${getTotalCartAmount()}</h3>
              </div>
            </div>
            <button onClick={handleCheckout} >PROCEED TO CHECKOUT</button>
        </div>
      </div>
      </div>
      
      
    </div>
  )
}

export default CartItems
