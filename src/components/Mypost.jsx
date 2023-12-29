import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { base_url } from '../services/baseUrl'
import { deletePostAPI, userPostAPI } from '../services/allApi'
import { addPostResponseContext } from '../Context/ContextShare'

function Mypost() {
  const [getPost,setGetPost] = useState([])
  const {addPostResponse,setAddPostResponse} = useContext(addPostResponseContext)

  const getUserPosts = async ()=>{
     if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await userPostAPI(reqHeader)
      if(result.status===200){
        setGetPost(result.data)
      }else{
        console.log(result);
        alert(result.response.data)
      }
     }
  }

  useEffect(()=>{
    getUserPosts()
  },[addPostResponse])

  const handleDelete = async (id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result = await deletePostAPI(id,reqHeader)
    if(result.status===200){
      getUserPosts()
    }else{
      alert(result.response.data)
    }
  }
  
  return (
    <>
     <div  className='border d-flex justify-content-evenly shadow p-3 rounded mt-3' >
     {
      getPost?.length>0?getPost.map(post=>(
        <Card style={{ width:'18rem' }} className='me-2'>
      <Card.Img variant="top" src={post?`${base_url}/uploads/${post.postImage}`:"holder.js/100px180"} />
      <Card.Body className='d-flex flex-column'>
        <Card.Title>{post.caption}</Card.Title>
        <button onClick={()=>handleDelete(post._id)} className='btn '><i class="fa-solid fa-trash"></i></button>
        </Card.Body>
    </Card>
      )):null
     }
     </div>
    </>
  )
}

export default Mypost