import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import { loginAPI, registerAPI } from '../services/allApi'
import { tokenAuthorizationContext } from '../Context/TokenAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({register}) {
    const {Isauthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)
    const isRegisterForm = register?true:false
    const [userdata,setUserData] = useState({
      username:"",email:"",password:""
    })
    const navigate = useNavigate()

    const handleRegister = async (e)=>{
      e.preventDefault()
      const {username,email,password} = userdata
      if(!username ||!email ||!password){
        alert("Please fill The form completely")
      }else{
        const result = await registerAPI(userdata)
        if(result.status===200){
          toast.success(`${result.data.username} registered successfuly`)
          setUserData({
            username:"",email:"",password:""

          })
          navigate('/')
        }else{
          toast.warning(result.response.data)
          console.log(result);
        }
      }
    }

    const handleLogin = async (e)=>{
      e.preventDefault()
      const {email,password} = userdata
      if(!email ||!password){
        alert("Please fill the form completely")
      }else{
        const result = await loginAPI(userdata)
        if(result.status===200){
          sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorized(true)
          setUserData({
            email:"",password:""
          })
          navigate('/dashboard')
        }else{
          toast.warning(result.response.data)
          console.log(result);
        }
      }
    }
  return (
    <>
    <Header/>
      <div height={'100vh'} className='d-flex justify-content-center align-items-center w-100'>
        <div style={{width:'500px',marginTop:'130px'}} className='card border rounded shadow p-4  mb-3'>
           <div className='d-flex align-items-center flex-column'>
           <h2 className='text-info'><i class="fa-solid fa-camera me-1"></i>Snapify</h2>
           <h3 className='text-info'>
            {
                isRegisterForm?'Signup In To Your Account':'Login In To Your Account'
            }
           </h3>
            
           <Form className='text-light w-100'>
                        {
                            isRegisterForm &&
                            <Form.Group className='mb-2' controlId='forBasicName'>
                                <Form.Control type='text' placeholder='Username' value={userdata.username}  onChange={e=>setUserData({...userdata,username:e.target.value})}/>
                            </Form.Group>
                        }
                        <Form.Group className='mb-2' controlId='forBasicEmail'>
                                <Form.Control type='email' placeholder='Enter Email Id' value={userdata.email}  onChange={e=>setUserData({...userdata,email:e.target.value})}/>
                       </Form.Group>
                       <Form.Group className='mb-3' controlId='forBasicPswd'>
                                <Form.Control type='password' placeholder='password' value={userdata.password}  onChange={e=>setUserData({...userdata,password:e.target.value})}/>
                        </Form.Group>
                        {
                            isRegisterForm ?
                            <div>
                                <button onClick={handleRegister}  className='btn btn-info'>Register</button>
                                <p className='text-info'>Already have an account? Click here to <Link to={'/'} className='text-danger'>Login</Link></p>
                            </div>:
                            <div>
                            <button onClick={handleLogin}  className='btn btn-info'>Login</button>
                            <p className='text-info'>New User? Click here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                        </div>
                        }
                     </Form>
           </div>
        </div>

      </div>
      
      <ToastContainer theme='colored'/>
    </>
  )
}

export default Auth