import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../util'
// import axios from 'axios'



const Signup = () => {
  const [signupInfo, setSignupInfo] = useState(
    {
    name: '',
    email: '',
    password: ""
  }
)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo)
  }

  console.log('login info ->', signupInfo);

  const handleSignup = async(e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('name, email and password are required')
    }
    try {
      const url = 'http://127.0.0.1:9000/auth/signup';
      const response = await fetch(url,
        {
        method: 'POST',
        headers:{
        'content-type':'application/json'
      },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      // const result = response.data;
      const { success, msg, error } = result;
      if(success){
        handleSuccess(msg)
        setTimeout(()=>{
          navigate('/login')
        },2000)
      }else if(error){
        const detail = error?.details[0].message;
        handleError(detail)
      }else if(!success){
        handleError(msg)
      }
      console.log(result);
  } catch (err) {
    handleError(err)
    // handleError(error.response?.data?.msg || error.message || "Signup failed");
  }
}
return (
  <div className='container'>
    <h1>SignUp</h1>
    <form action="" onSubmit={handleSignup}>
      <div>
        <label htmlFor="name">Name</label>
        <input onChange={handleChange} type="text" name='name' autoFocus placeholder='Enter your name...' value={signupInfo.name} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} type="email" name='email' placeholder='Enter your email...' value={signupInfo.email} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input onChange={handleChange} type="password" name='password' placeholder='Enter your passwords...' value={signupInfo.password} />
      </div>  
      <button type='submit'>SignUp</button>
      <span>Already have an account ?
        <Link to='/login'>Login</Link>
      </span>
    </form>
    <ToastContainer />
  </div>
)
}

export default Signup