import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pinsterster_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import logo from '../Assets/logo.png'

const Footer = () => {
  return (
      <div className='footer-container'>
        <div className='footer'>
            <img src={logo} alt="" />
          <div className="footer-heading footer-1">
            <h2>Watch</h2>
            <a href="#">Pricing</a>
          </div>
          <div className="footer-heading footer-2">
            <h2>Resources</h2>
            <a href="#">Blog</a>
            <a href="#">User guides</a>
            <a href="#">Webinars</a>
          </div>
          <div className="footer-heading footer-3">
            <h2>Company</h2>
            <a href="#">About</a>
            <a href="#">Join us</a>
          </div>
          <div className='footer-email-form'>
            <h2 className='join'>Join our newsletter</h2>
            <input types="email" placeholder='Enter your email address' id="footer-email"></input>
            <input type="submit" value="Sign up" id="footer-email-btn"></input>
          </div>
        </div>
        <div className='footer-bottom'>
          <div className='translate'></div>
          <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2023 - All Right Reserved.</p>
          </div>
          <div className="footer-social-icon">
        
            <img src={instagram_icon} alt="" />
        
            <img src={pinsterster_icon} alt="" />
        
            <img src={whatsapp_icon} alt="" />
        
          </div>
       </div>
      </div>
      
  )
}

export default Footer
