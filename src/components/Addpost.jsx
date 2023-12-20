import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { addPostAPI } from '../services/allApi';
import { addPostResponseContext } from '../Context/ContextShare';

function Addpost() {
    const {addPostResponse,setAddPostResponse} = useContext(addPostResponseContext)
    const [show, setShow] = useState(false);
    const [postDetails,setPostDetails] = useState({
      caption:"",postImage:""
    })
    const [preview,setPreview] = useState("")
    const [token,setToken] = useState("")

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
         setToken(sessionStorage.getItem("token"))
      }else{
        setToken("")
      }
    },[])

    useEffect(()=>{
       if(postDetails.postImage){
        setPreview(URL.createObjectURL(postDetails.postImage))
       }
    },[postDetails.postImage])

  const handleClose = () => {
    setShow(false);
    setPostDetails({
      caption:"",postImage:""
    })
    setPreview("")
  }

  const handlePost = async (e)=>{
    e.preventDefault()
    const {caption,postImage} = postDetails
    if(!postImage){
      alert("Please select a picture")
    }else{
      const reqBody = new FormData()
      reqBody.append("caption",caption)
      reqBody.append("postImage",postImage)
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await addPostAPI(reqBody,reqHeader)
        if(result.status===200){
          console.log(result.data);
          handleClose()
          setAddPostResponse(result.data)
        }else{
          console.log(result);
          console.log(result.response.data);
        }

      }
    }
  }
  const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="success" onClick={handleShow} style={{width:'138px'}}>
        Add Post
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Make Your Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className='col-lg-6'>
              <label>
              <input type="file" style={{display:'none'}} onChange={e=>setPostDetails({...postDetails,postImage:e.target.files[0]})}/>
              <img className='img-fluid' src={preview?preview:"https://lirp.cdn-website.com/343f0986cb9d4bc5bc00d8a4a79b4156/dms3rep/multi/opt/1274512-placeholder-640w.png"} alt="" />
              </label>
            </div>
            <div className='col-lg-6'>
              <input type="text" className="form-control mt-3" placeholder='Caption' height={'200px'} value={postDetails.caption} onChange={e=>setPostDetails({...postDetails,caption:e.target.value})}/>
            </div>
               
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handlePost}  variant="primary">Post</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Addpost