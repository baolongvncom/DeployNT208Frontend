import React from 'react'
import './ProductView.css'
import all_product from '../Assets/all_product'

const ProductView = () => {
    return (
        <div className="product-grid">
          {all_product.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <div className='product-name'>
                <p>{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      );
}

export default ProductView
