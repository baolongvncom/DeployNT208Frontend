import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import chat_icon from '../Assets/chat_icon.png'
import order_icon from '../Assets/order_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import user_icon from '../Assets/avatar.png'
import dropdown_icon from '../Assets/dropdown_icon.png'
import { AuthenticationContext } from '../../Context/AuthenticationContext'

const Navbar = () => {

  const {setAuthToken, setIsAdmin} = useContext(AuthenticationContext);
  
  const [menu,setMenu] = useState("shop");
  const {getTotalCartItems, getTotalOrderItems} = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }
  return (
    <div className='navbar'>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={dropdown_icon} alt="" />
      <ul ref={menuRef} className="nav-menu">
      <li onClick={()=>{setMenu("watches")}}><Link style={{ textDecoration: 'none'}} to='/watches'>Watches</Link>{menu==="watches"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("about")}}><Link style={{ textDecoration: 'none'}} to='/'>About us</Link>{menu==="about"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("contact")}}><Link style={{ textDecoration: 'none'}} to='/'>Contact</Link>{menu==="contact"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-logo">
        <Link to="/watches"><img src={logo} alt="" /></Link>
      </div>
      <div className="nav-login-cart">
      {localStorage.getItem('auth-token')
        ? <button onClick={()=>{setIsAdmin(false);setAuthToken(null);localStorage.removeItem('auth-token');window.location.replace("/")}}>Logout</button> 
      :<Link to='/login'><button>Login</button></Link>}
        {localStorage.getItem('auth-token')
        ? <Link to='/profile/overview'><img src={user_icon} alt="" className='user_icon'/></Link>:null}
        <Link to='/cart'><img src={cart_icon} alt="" className='cart_icon'/></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
        <Link to='/chatpage'><img className='chat-icon' src={chat_icon} alt="" /></Link>
      </div>
    </div>
  )
}

export default Navbar
