import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Single from './pages/Single'
import Write from './pages/Write'
import Footer from './pages/Footer'
import "./style.scss"


const App = () => {
  const location = useLocation(); 
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";
  return (
    <div className='app'>
      <div className='container'>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/post/:id" element={<Single/>}/>
        <Route path="/write" element={<Write/>}/>
      </Routes>
      {!hideNavbar && <Footer />}
      </div>
    </div>
  )
}

export default App
