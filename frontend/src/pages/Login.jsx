// import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../context/authContext';

const Login = () => {
  const [inputs,setinputs]=useState(
    {
      username:"",
      password:"",
    }
  );

  const [err,setError]=useState(null);

  const navigate = useNavigate();

  const {login}=useContext(authContext)

  // console.log(CurrentUser)

  const handleChange =(e) =>{
    setinputs((prev)=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        await login(inputs)
       navigate("/");
      } catch (err) {
        setError(err.response?.data || "Something went wrong");
      }
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form >
         <input type="text" placeholder='username' name='username' onChange={handleChange}/>
         <input type="text" placeholder='password' name='password' onChange={handleChange} />
         <button onClick={handleSubmit}>Login</button>
         {err && <p>{err}</p>}
         <span>Don't you have an account? </span>
         <Link className='click' to={"/register"}> click here</Link>
     </form>
    </div>
  )
}

export default Login
