import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from "axios"


const Home = () => {
  const [posts,setPosts]=useState([])

  const location =useLocation()
  const cat=location.search

  // console.log(posts[3])

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const res=await axios.get(`http://localhost:8800/api/posts${cat}`)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  },[cat])


  const getText =(html)=>{
    const doc=new DOMParser().parseFromString(html,'text/html')
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className="posts">
        {posts.map((post)=>(
           <div className="post" key={post.id}>
             <div className="img">
              <img src={`../upload/${post.img}`} alt="hello" />
              <div className='background'></div>
              <div className='background1'></div>
             </div>
             <div className="content">
              <Link className='link' to={`/post/${post.id}`} >
               <h1>{post.title}</h1>
               </Link>
               <p>{getText(post.desc)}</p>
               <button>Read More</button>
              
             </div>
           </div>
        ))}
       </div>
    </div>
  )
}

export default Home
