import React, { useContext, useEffect, useState } from 'react'
import Menu from '../components/Menu'
import {Link, useLocation, useNavigate} from "react-router-dom"
import moment from "moment"
import axios from "axios"
import { authContext } from '../context/authContext'

const Single = () => {
  const [post,setPost]=useState([])

  const location =useLocation()

  const postId = location.pathname.split("/")[2]


  const {CurrentUser}=useContext(authContext)
  // console.log(CurrentUser)
  // console.log(post)

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const res=await axios.get(`http://localhost:8800/api/posts/${postId}`,{
          withCredentials:true
        })
        setPost(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  },[postId])
  const navigate=useNavigate()
  const handleDelete = async ()=>{
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`,{
        withCredentials:true
      })
      navigate("/")

    } catch (err) {
      console.log(err)
    }
  }
  const getText =(html)=>{
    const doc=new DOMParser().parseFromString(html,'text/html')
    return doc.body.textContent
  }
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post.img}`} alt="" />
         <div className="user">{
          post.userImg && 
          <img src={post.userImg} alt="" />
         }
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {
          (CurrentUser.username)===post.username &&
          <div className="edit">
            <Link to={`/write?edit=1`} state={post}>
             <img src="https://logowik.com/content/uploads/images/888_edit.jpg" alt="" />
             </Link>
             <img  onClick={handleDelete} src="https://static.vecteezy.com/system/resources/previews/004/581/271/non_2x/trash-can-icon-garbage-bin-with-lid-delete-symbol-illustration-free-vector.jpg" alt="" />
          </div>
          }
         </div >
         <h1>{post.title}</h1>
         {getText(post.desc)}
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single
