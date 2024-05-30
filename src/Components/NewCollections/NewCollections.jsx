import React, { useContext } from "react";
import Item from "../Item/Item";
import "./NewCollections.css";
import { useState } from "react";
import { useEffect } from "react";
import { ShopContext } from "../../Context/ShopContext";

const NewCollections = () => {
  const { all_product } = useContext(ShopContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Số sản phẩm trên mỗi trang

  // Tính toán chỉ số đầu và cuối của các sản phẩm trong trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = all_product.slice(indexOfFirstItem, indexOfLastItem);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(all_product.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // useEffect(()=>{
  //   fetch('/newcollections')
  //   .then((response)=>response.json())
  //   .then((data)=>setNew_collection(data));
  // },[])
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {currentItems.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default NewCollections;
