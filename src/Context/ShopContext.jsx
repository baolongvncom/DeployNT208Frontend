import React, { createContext, useState } from 'react'
import { useEffect } from 'react';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [User,setUser] = useState({});
    const [all_product,setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [totalCartAmount, setTotalCartAmount] = useState(0);
    const [orderList, setOrderList] = useState([]);

    useEffect(()=>{
        fetch('/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))
    
        if(localStorage.getItem('auth-token')){
            fetch('/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));

            fetch('/getinfo',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
            }).then((response)=>response.json())
            .then((data)=>setUser(data));

            fetch('/getorder',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
            }).then((response)=>response.json())
            .then((data)=>setOrderList(data));
        }
    },[])

    useEffect(()=>{
        setTotalCartAmount(getTotalCartAmount());
    })
   
    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: itemId in prev ? prev[itemId] + 1 : 1}));
        if(localStorage.getItem('auth-token')){
            fetch('/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((data)=>console.log("Product Added to Cart"));
        }
    }

    const removeAllFromCart = (itemId) => {
        setCartItems((prev) => {
            const { [itemId]: omit, ...rest } = prev;
            return rest;
            });
        if(localStorage.getItem('auth-token')){
            fetch('/removeallfromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((data)=>console.log("Product Removed from Cart"));
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev) => {
            if (prev[itemId] === 1) {
                const { [itemId]: omit, ...rest } = prev;
                return rest;
            } else {
              return { ...prev, [itemId]: prev[itemId] - 1 };
            }
          });
        if(localStorage.getItem('auth-token')){
            fetch('/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((data)=>console.log("Product Removed from Cart"));
        } 
    }
   
    const getTotalCartAmount = () => {
        let totalAmout = 0;
        for (const item in cartItems)
        {
            let itemInfo = all_product.find((product)=>product.id === item);
            if (itemInfo)
            {
                totalAmout += itemInfo.price * cartItems[item];
            }
        }
        return totalAmout;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems)
        {
            totalItem += cartItems[item];
        }
        return totalItem;
    }

    const getTotalOrderItems = () => {
        let totalItem = 0;
        for(const item in orderList)
        {
            totalItem += 1;
        }
        return totalItem;
    }

    const searchProduct = (search) => {
        let searchResult = [];
        all_product.forEach((product)=>{
            if(product.name.toLowerCase().includes(search.toLowerCase()))
            {
                searchResult.push(product);
            }
        })
        return searchResult;
    }

    const contextValue = {User, getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, removeAllFromCart, searchProduct, totalCartAmount, orderList, getTotalOrderItems}
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
