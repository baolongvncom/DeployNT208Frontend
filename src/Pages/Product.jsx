import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();

  const [product, setProduct] = useState({});

  const [viewProduct, setViewProduct] = useState({});

  useEffect(() => {
    const temp_product = all_product.find((e)=> e.id === productId);
    setProduct(temp_product);
  }, [all_product, productId]);

  useEffect(() => {
    if (product)
      setViewProduct(product);
  }, [product]);

  return (
    <div>
      <Breadcrum product={viewProduct}/>
      <ProductDisplay product={viewProduct} />
      {/* <DescriptionBox /> */}
      <RelatedProducts image={viewProduct.image} />
    </div>
  )
}

export default Product
