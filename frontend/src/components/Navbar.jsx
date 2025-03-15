import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import bg from "../images/bg.jpg"
import { authContext } from '../context/authContext'

const Navbar = () => {
  const {CurrentUser,logout}=useContext(authContext)
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={bg} alt="" />
          </Link>
          
        </div>
        <div className="links">
          <Link className='link' to="/?cat=art">
          <h6>ART</h6>
          </Link>
          <Link className='link' to="/?cat=travel">
          <h6>TRAVEL</h6>
          </Link>
          <Link className='link' to="/?cat=tech">
          <h6>TECH</h6>
          </Link>
          <Link className='link' to="/?cat=cinema">
          <h6>CINEMA</h6>
          </Link>
          <Link className='link' to="/?cat=food">
          <h6>FOOD</h6>
          </Link>
          <Link className='link' to="/?cat=science">
          <h6>SCIENCE</h6>
          </Link>
         {CurrentUser &&  <span>{CurrentUser.username}</span>}
          {CurrentUser?<span onClick={logout}>Logout</span>:<Link to="/login" className='link'>Login</Link>}
          <span className='write'>
            <Link className='link' to="/write">Write</Link>
          </span>
        </div>
      </div>
      
    </div>
  )
}

export default Navbar
