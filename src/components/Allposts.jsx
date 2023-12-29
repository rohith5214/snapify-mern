import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Header from './Header'
import { getAllPostsApi } from '../services/allApi'
import { base_url } from '../services/baseUrl'

function Allposts() {
    const [getAllPosts,setGetAllPosts] = useState([])
   const getAllUploadedPost = async ()=>{
    const result = await getAllPostsApi()
    if(result.status===200){
        console.log(result);
       setGetAllPosts(result.data)
    }else{
        console.log(result);
        console.log(result.response.data);
    }
   }
   useEffect(()=>{
    getAllUploadedPost()
   },[])
  return (
    <>
    <Header/>
    <div>
    <h1 style={{fontSize:'50px'}} className='text-center  mt-3'>Share Your Moments</h1>
    <div className='mt-3 p-4 d-flex'>
    {
        getAllPosts?.length>0?getAllPosts.map(item=>(
            <Card style={{ width:'18rem' }} className='me-2'>
      <Card.Img variant="top" src={item?`${base_url}/uploads/${item.postImage}`:"holder.js/100px180"} />
      <Card.Body className='d-flex flex-column'>
        <Card.Title>{item.caption}</Card.Title>
        </Card.Body>
    </Card>
    
        )):null
    }
    </div>

    </div>
    </>
  )
}

export default Allposts