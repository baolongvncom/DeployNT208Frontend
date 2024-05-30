import React, { useEffect, useState, useContext } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { ShopContext } from "../../Context/ShopContext";


const RelatedProducts = (imageUrl) => {
  const {all_product} = useContext(ShopContext);

  const [viewProductIds, setViewProductIds] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchData();
  }, [imageUrl]);

  async function fetchData() {
    console.log(imageUrl.image);
    
    let formData = new FormData();
    const response = await fetch(imageUrl.image);
    const blob = await response.blob();

    // Append the blob to the formData
    formData.append("query_img", blob, "image.png");

    await fetch("/imagesearch", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setViewProductIds(data.scores))
      .then(() => console.log(viewProductIds));
  }

  return (
    <div className='relatedproducts'>
      <br />
        <h1>Related Watches</h1>
        <div className="relatedproducts-item">
            {viewProductIds.map((id, i) => {
          const product = all_product.find((item) => item.id === id);
          if (product) {
            return (
              <Item
                key={i}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            );
          } else {
            return null;
          }
        })}
        </div>
    </div>
  )
}

export default RelatedProducts
