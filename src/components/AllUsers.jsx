import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Table } from 'react-bootstrap'
import { getAllUsersApi } from '../services/allApi'
import { Link } from 'react-router-dom'

function AllUsers() {
    const [getAllUsers,setGetAllUsers] = useState([])

    const getAllRegisteredUsers = async ()=>{
        const result = await getAllUsersApi()
        if(result.status===200){
            setGetAllUsers(result.data)
            console.log(result);
        }else{
            console.log(result);
            console.log(result.response.data);
        }
    }

    useEffect(()=>{
        getAllRegisteredUsers()
    },[])
  return (
    <>
    <Header/>
    <h1 style={{fontSize:'50px'}} className='text-center  mt-3'>All Users List</h1>
    <div className='d-flex justify-content-center align-items-center mt-3'>
       <Table striped bordered hover className='w-75'>
       <thead>
        <tr>
          <th className='text-light fw-bolder fs-4'>Username</th>
          <th className='text-light fw-bolder fs-4'>Gmail</th>
        </tr>
      </thead>
      {
        getAllUsers?.length>0?getAllUsers.map(user=>(
            <tbody>
        <tr>
          <td className='text-light fs-5'>{user.username}</td>
          <td className='text-light fs-5'>{user.email}</td>
        </tr>
       </tbody>
        )):null
      }
       </Table>
    </div>
    
    </>
  )
}

export default AllUsers