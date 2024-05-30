import React, {useState, useContext, useEffect} from 'react'
import './CheckoutPage.css';
import VietnamData from './ProvinceList';
import { ShopContext } from '../../Context/ShopContext';
import CartItemUnit from '../CartItems/CartItemUnit';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const CheckoutPage = () => {

    const {all_product, cartItems, totalCartAmount} = useContext(ShopContext);

    const provinceList = Object.keys(VietnamData);

    const [province, setProvince] = useState('');
    const [cities, setCities] = useState([]);
    const [wards, setWards] = useState([]);
    const orderContant = {
        payment: {
            later_money: 'COD',
            paypal: 'PayPal'
        }
    };
    // Tạo các biến để lưu thông tin đơn hàng
    const [orderDetail, setOrderDetail] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        province: '',
        city: '',
        ward: '',
        time: new Date().toLocaleString(),
        total: totalCartAmount,
        products: cartItems,
        payment: orderContant.payment.later_money
    });

    useEffect(() => {
        setOrderDetail({...orderDetail, total: totalCartAmount});
    }
    , [totalCartAmount])

    const changHandler = (e) => { 
        setOrderDetail({...orderDetail, [e.target.name]: e.target.value});
        if(e.target.name === 'province'){
            setProvince(e.target.value);
            setCities(Object.keys(VietnamData[e.target.value]));
        }
        if(e.target.name === 'city'){
            setWards(VietnamData[province][e.target.value]);
        }
    }

    const OrderSuccess = () => {
        alert('Order successfully'); 
        window.location.replace('/');
    }

    useEffect(() => {
        setOrderDetail({...orderDetail, products: cartItems});
    }, [cartItems])

    useEffect(() => {
        console.log(orderDetail);
    }, [orderDetail])

    const AddOrder = async () => {
        // Alert if no product in cart
        if(Object.keys(cartItems).length === 1){
            alert('No product in cart');
            return;
        }

        let order = orderDetail;

        // check if all fields are filled
        for (let key in order){
            if(order[key] === ''){
                alert('Please fill all fields');
                return;
            }
        }

        // Check email format
        let email = order.email;
        let emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!email.match(emailFormat)){
            alert('Invalid email format');
            return;
        }
        
        await fetch('/order', {
            method: 'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body: JSON.stringify(order)
        }).then((response) => response.json()).then((data) => {
            data.success?OrderSuccess():alert(data.message)
        }).catch((err) => console.log(err));

    }
    const initialOptions = {
        "client-id": "AXrlcvr_dTb5w3-t7gnzHYE5WssHnB3-sCXl_CoWieedGitUMN_gGyE0R2XDT2b1LbbkllYDSYwWMeww",
        "enable-funding": "card",
        "disable-funding": "paylater,venmo",
        "data-sdk-integration-source": "integrationbuilder_sc",
    };
    const [message, setMessage] = useState("");
    const serverURL = "http://localhost:4000"
    // Renders errors or successfull transactions on the screen.
    function Message({ content }) {
        return <p>{content}</p>;
    }

    
    
  return (
    <div className='checkout'>
     
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Full name</p>
            <input value={orderDetail.fullname} onChange={changHandler} type="text" name='fullname' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Email</p>
            <input value={orderDetail.email} onChange={changHandler} type="text" name='email' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Phone Number</p>
            <input value={orderDetail.phone} onChange={changHandler} type="text" name='phone' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Address</p>
            <input value={orderDetail.address} onChange={changHandler} type="text" name='address' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Province</p>
            <select value={orderDetail.province} onChange={changHandler} name='province' className='addproduct-selector'>
                {
                    provinceList.map((province, index) => {
                        return <option key={index} value={province}>{province}</option>
                    })
                }
            </select>
        </div>
        <div className="addproduct-itemfield">
            <p>City</p>
            <select value={orderDetail.city} onChange={changHandler} name='city' className='addproduct-selector'>
                {
                    cities.map((city, index) => {
                        return <option key={index} value={city}>{city}</option>
                    })
                }
            </select>
        </div>
        <div className="addproduct-itemfield">
            <p>Ward</p>
            <select value={orderDetail.ward} onChange={changHandler} name='ward' className='addproduct-selector'>
                {
                    wards.map((ward, index) => {
                        return <option key={index} value={ward}>{ward}</option>
                    })
                }
            </select>
        </div>
                <div className="addproduct-itemfield">
            <p>Payment Method</p>
                <select
                    value={orderDetail.payment}
                    onChange={changHandler}
                    name='payment'
                    className='addproduct-selector'
                >
                    {Object.keys(orderContant.payment).map((key, index) => (
                        <option key={index} value={orderContant.payment[key]}>
                            {orderContant.payment[key]}
                        </option>
                    ))}
                </select>
        </div>
        {orderDetail.payment === orderContant.payment.paypal && (
            <div className='paypal-btn'>
                <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                        style={{
                            shape: "rect",
                            layout: "vertical",
                        }}
                        createOrder={async () => {
                            try {
                                let order = orderDetail;
                            const response = await fetch(`${serverURL}/api/orders`, {
                                method: "POST", mode:'cors',
                                headers: {
                                "Content-Type": "application/json",
                                },
                                // use the "body" param to optionally pass additional order information
                                // like product ids and quantities
                                body: JSON.stringify(order)
                            });

                            const orderData = await response.json();

                            if (orderData.id) {
                                return orderData.id;
                            } else {
                                const errorDetail = orderData?.details?.[0];
                                const errorMessage = errorDetail
                                ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                : JSON.stringify(orderData);

                                throw new Error(errorMessage);
                            }
                            } catch (error) {
                            console.error(error);
                            setMessage(`Could not initiate PayPal Checkout...${error}`);
                            }
                        }}
                        onApprove={async (data, actions) => {
                            try {
                            const response = await fetch(
                                `${serverURL}/api/orders/${data.orderID}/capture`,
                                {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                },
                                console.log(data)
                            );

                            const orderData = await response.json();
                            // Three cases to handle:
                            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                            //   (2) Other non-recoverable errors -> Show a failure message
                            //   (3) Successful transaction -> Show confirmation or thank you message

                            const errorDetail = orderData?.details?.[0];

                            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                                return actions.restart();
                            } else if (errorDetail) {
                                // (2) Other non-recoverable errors -> Show a failure message
                                throw new Error(
                                `${errorDetail.description} (${orderData.debug_id})`,
                                );
                            } else {
                                // (3) Successful transaction -> Show confirmation or thank you message
                                // Or go to another URL:  actions.redirect('thank_you.html');
                                const transaction =
                                orderData.purchase_units[0].payments.captures[0];
                                alert(`Transaction ${transaction.status}: ${transaction.id}. OrderSuccess`,)
                                // console.log(
                                // "Capture result",
                                // orderData,
                                // JSON.stringify(orderData, null, 2),
                                // );
                                AddOrder()
                            }
                            } catch (error) {
                            console.error(error);
                            setMessage(
                                `Sorry, your transaction could not be processed...${error}`,
                            );
                            }
                        }}
                        />
                </PayPalScriptProvider>
                <Message content={message} />                      
            </div>
        )}
        {orderDetail.payment === orderContant.payment.later_money && (
            <button onClick={AddOrder} className="addproduct-btn">Complete Order</button>
        )}
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
        <div className="cartitems-total-item">
            <h3>Total</h3>
            <h3>${totalCartAmount}</h3>
        </div>
      </div>
    

    </div>
  )
}

export default CheckoutPage