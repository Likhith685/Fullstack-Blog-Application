import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from "axios"
import { useState } from 'react'



const Register = () => {

  const [inputs,setInputs]=useState({
    username:"",
    email:"",
    password:"",
  });

  const [err, setError] = useState(null); 

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await axios.post("http://localhost:8800/api/auth/register",inputs); 
      navigate("/login")
    } catch (err) {
      setError(err.response.data); 
    }
  };


  return (
     <div className='auth'>
      <h1>Register</h1>
      <form >
         <input type="text" placeholder='username' name='username' onChange={handleChange} />
         <input type="text" placeholder='email' name='email' onChange={handleChange} />
         <input type="text" placeholder='password' name='password' onChange={handleChange}/>
         <button onClick={handleSubmit}>Register</button>
         {err && <p>This is an Error!</p>}
         <span>Do you have an account? </span>
         <Link className='click' to={"/login"}>click here</Link>
      </form>
    </div>
  )
}

export default Register
