import React from 'react'
import './LoginSignup.css'
import { useState } from 'react'
const Signup = () => {
  
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  
const signup = async () =>{
    // Check for empty fields
    if (!formData.username || !formData.email || !formData.password) {
      alert('Please fill all the fields');
      return;
    }
    // // Check for password strength
    // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*,-/+=])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
    //   alert('Password is not strong enough');
    //   return;
    // }
    // Check for email
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(formData.email)) {
      alert('Invalid email');
      return;
    }
    // Check for checkbox
    if (!checked) {
      alert('Please agree to the terms and conditions');
      return;
    }
    console.log("signup Function Excuted",formData);
    let responseData;
    await fetch('/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)
  
    if(responseData.success) {
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors)
    }
  
  }
  return (
    <div className='loginsignup'>
    <div className="loginsignup-container">
    <p className="loginsignup-login">Already have an account? <span onClick={() => { window.location.href = "/login" }}>Login here</span> </p>
      <div className="loginsignup-fields">
        <p >Required field*</p>
        {/* <p className='label'>Title*</p>
        <div className="option">

        <input type="radio" id='mr'name='mr' value='mr'/>
        <label for="mr">Mr</label>

        <input type="radio" id='mrs'name='mrs' value='mrs'/>
        <label for="mrs">Mrs</label>

        <input type="radio" id='miss'name='miss' value='miss'/>
        <label for="miss">Miss</label>

        <input type="radio" id='mx'name='mx' value='mx'/>
        <label for="mx">Mx</label>
        </div>

        <input name='fname'  type="text" placeholder='First Name*' />
        
        <input name='lname'  type="text" placeholder='Last Name*' />
        <p className='label'>Day of Birth</p>   
        <select id="myDropdown">
              <option value="#">Ngày</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
          </select> */}
          <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <ul>
              <li>No repetition of more than two characters</li>
              <li>One lowercase character</li>
              <li>One uppercase character</li>
              <li>At least 1 allowed special character(s) from ~!@#$%^&*,-/+=</li>
              <li>8 characters minimum</li>
          </ul>
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
      </div> 
      <button onClick={()=>{signup()}}>Continue</button>
      
      {/* <p className="loginsignup-login">Forgot your password?  </p> */}
      <p className="loginsignup-login">Read the <span >Privacy Policy</span> for further information </p>
      <div className="loginsignup-agree">
        <input type="checkbox" checked={checked}
          onChange={handleCheckboxChange} />
        <p>I would also like to receive marketing information about Cartier's 
          products or services.

We may send you this information by email, text message, 
phone, or postal mail. We may also use your information to
deliver personalized messages or advertisements on social 
media or other digital platforms. You may request that we 
stop marketing to you at any time.</p>
      </div>
    </div>
    
  </div>
  )
}

export default Signup
