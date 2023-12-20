import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { tokenAuthorizationContext } from '../Context/TokenAuth'
function Header({insideDashboard}) {
  const {Isauthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)

  const navigate = useNavigate()
   const handleLogout = async()=>{
      sessionStorage.removeItem("existingUser")
      sessionStorage.removeItem("token")
      alert("Are You Sure You Want to Logout?")
      setIsAuthorized(false)
      navigate('/')
   }
  return (
    <>
      
      <Navbar expand="lg" className='bg-info rounded w-100' style={{zIndex:'1',position:'fixed'}}>
      <Container>
        <Navbar.Brand className='text-light fw-bolder fs-2'><i class="fa-solid fa-camera me-1"></i>Snapify</Navbar.Brand>
        {
          insideDashboard && 
          <button onClick={handleLogout} className='btn btn-danger ms-auto text-light fs-5'>Logout<i class="fa-solid fa-right-from-bracket"></i></button>

        }
    </Container>
    </Navbar>
    </>
  )
}

export default Header