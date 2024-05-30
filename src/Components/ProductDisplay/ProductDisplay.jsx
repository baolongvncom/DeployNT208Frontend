import React, {useContext} from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'
import ProductSize from '../ProductSizeSelector/ProductSizeSelector'

const ProductDisplay = (props) => {

    const {product} = props;
    const {addToCart} = useContext(ShopContext)

    const addToCartButton = (productId) => {
      // Check for login
      if (!localStorage.getItem('auth-token')) {
        alert('You need to login to add to cart');
        window.location.href = '/login';
        return;
      }

      addToCart(productId);
    }

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img">
        <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <p className='productdisplay-right-category'><span>Brand :</span>{product.brand}</p>
        <p className='productdisplay-right-category'><span>Model :</span>{product.model}</p>
        
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-new">${product.price}</div>
        </div>
        <button onClick={()=>{addToCartButton(product.id)}}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Year :</span>{product.year}</p>
        <p className='productdisplay-right-category'><span>Sex :</span>{product.sex}</p>

      </div>
    </div>
  )
}

export default ProductDisplay 
