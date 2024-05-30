import React, {useState, useEffect} from 'react'
import './AdminListProduct.css'
import cross_icon from '../Assets/cross_icon.png'
import { MdModeEdit } from "react-icons/md";
import '../../Pages/CSS/AdminPage.css'
import { Link } from 'react-router-dom'

const AdminListProduct = () => {

  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    await fetch('/allproducts').then((response) => response.json())
    .then((data) => {
      setAllProducts(data);
    });
  }

  useEffect(()=>{
    fetchProducts();
  }, [])

  const remove_product = async (product_id)=> {
    await fetch('/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:product_id})
    })
    await fetchProducts();
  }

  return (
    <div className='admin'>
      
    <div className='list-product'>
        <h1>
          All Products List
        </h1>
        <div className="listproduct-allproduct">
          <hr />
          {allProducts.map((product, index) => {
            return <div key={index} className="listproduct-format-main listproduct-format">
            <img src={`${product.image}`} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.price}</p>
            <p>{product.brand}</p>
            <p>{product.model}</p>
            <p>{product.size}</p>
            <p>{product.sex}</p>
            <p>{product.year}</p>
            <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
            <Link to={`/updateproduct/${product.id}`}><MdModeEdit/></Link>
          </div>
          })}
        </div>
    </div>
    </div>
  )
}

export default AdminListProduct