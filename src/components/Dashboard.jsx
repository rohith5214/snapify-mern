import React, { useEffect, useState } from 'react'
import { base_url } from '../services/baseUrl'
import { updateUserAPI } from '../services/allApi'

function Dashboard() {
    const [username,setUserName] = useState("")
    const [userProfile,setUserProfile] = useState({
      username:"",email:"",password:"",bio:"",otherlinks:"",profile:""
    })

    const [existingImage,setExistingImage] = useState("")
    const [preview,setPreview] = useState("")

    useEffect(()=>{
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,bio:user.bio,otherlinks:user.otherlinks,profile:""})
      setExistingImage(user.profile)
    },[])
    useEffect(()=>{
      if(sessionStorage.getItem("existingUser")){
        setUserName(JSON.parse(sessionStorage.getItem("existingUser")).username)
      }
    },[])
    
    useEffect(()=>{
      if(userProfile.profile){
        setPreview(URL.createObjectURL(userProfile.profile))
      }else{
        setPreview("")
      }
    },[userProfile.profile])

    const handleUpdate = async()=>{
      const {username,email,password,bio,otherlinks,profile} = userProfile
      if(!bio ||!otherlinks){
        alert("Please fill the fields!!!")
      }else{
        const reqBody = new FormData()
        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("password",password)
        reqBody.append("bio",bio)
        reqBody.append("otherlinks",otherlinks)
        preview?reqBody.append("profileImage",profile):reqBody.append("profileImage",existingImage)
        const token = sessionStorage.getItem("token")
        if(preview){
          const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result = await updateUserAPI(reqBody,reqHeader)
          if(result.status===200){
            alert("Updated Successfuly")
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          }else{
            console.log(result);
            console.log(result.response.data);
          }
        }else{
          const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
        }
      }
    }
 
  return (
    <>
      <div className='card border shadow p-4' style={{width:'400px',marginTop:'20px'}}>
        <div className='d-flex align-items-center flex-column'>
           <h3 className='fs-2 text-light mb-2'>Snapify</h3>
           <label className='text-center'>
              <input type="file" style={{display:'none'}} onChange={e=>setUserProfile({...userProfile,profile:e.target.files[0]})}/>
              {
                existingImage!==""?
                <img src={preview?preview:`${base_url}/uploads/${existingImage}`} className='rounded-circle' width={'200px'} height={'200px'} alt="" />
                :
                <img src={preview?preview:"https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"} className='rounded-circle' width={'200px'} height={'200px'} alt="" />

              }
           </label>
           <h2 className='mt-1' style={{fontFamily:'sans-serif'}}>{username}</h2>
           <input type="text" className='form-control' value={userProfile.bio} onChange={e=>setUserProfile({...userProfile,bio:e.target.value})}/>
           <input type="text" className='form-control mt-1'value={userProfile.otherlinks} onChange={e=>setUserProfile({...userProfile,otherlinks:e.target.value})}/>
            <button onClick={handleUpdate} className='btn btn-warning mt-1 w-100'>Update</button>
        </div>
    </div>
    
    </>
  )
}

export default Dashboard