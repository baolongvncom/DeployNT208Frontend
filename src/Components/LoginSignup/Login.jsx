import React from 'react'
import './LoginSignup.css'
import { useState } from 'react'
import { AuthenticationContext } from '../../Context/AuthenticationContext'
const Login = () => {
  const {setAuthToken, setIsAdmin} = React.useContext(AuthenticationContext);
  
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  

  const login = async () =>{
    console.log("Login Function Excuted",formData)
    let responseData;
    await fetch('/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)
  
    if(responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      if (responseData.admin) {
        window.location.replace("/listproduct");
        setIsAdmin(true);
      }
      else {
        window.location.replace("/");
        setIsAdmin(false);
      }
      setAuthToken(responseData.token);
    }
    else {
      alert(responseData.message)
    }
  }
  return (
    <div className='loginsignuplogin'>
    <div className="loginsignup-containerlogin">
    <h2>ALREADY REGISTERED?</h2>
      <h2>CREATE YOUR ACCOUNT</h2>
      <p className="loginsignup-login">Create an account? <span onClick={() => { window.location.href = "/signup" }}>Register here</span> </p>
      <div className="loginsignup-fields">
        <p>Required field*</p>
        <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
        <p>Show</p>   
        <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
      </div> 
      <button onClick={()=>{login()}}>Continue</button>
      
      {/* <p className="loginsignup-login">Forgot your password?  </p> */}
      <p className="loginsignup-login">Read the <span >Privacy Policy</span> for further information </p>
      <div className="loginsignup-agree">
        {/* <input type="checkbox" name="" id="" /> */}
        <p>By continue, I agree to the terms of use & privacy policy.</p>
      </div>
    </div>
    
  </div>
)
}

export default Login
