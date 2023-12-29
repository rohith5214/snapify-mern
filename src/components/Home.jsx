import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from './Footer'

function Home() {
  return (
    <>
<div>
    <div style={{width:'100%',height:'100vh',backgroundColor:'#FF69B4'}} className='container-fluid rounded '>
      <Row className='align-items-center p-5'>
        <Col sm={12} md={6}>
          <h1 style={{fontSize:'80px'}} className=' text-light'><i class="fa-solid fa-camera me-1"></i>Snapify.Com</h1>
          <p style={{fontSize:'20px'}}>Its a SocialPlatform for sharing photographs and other media. Start Sharing your Moments to see what you are friends Up To..!!</p>
          <Link to={'/login'} className='fs-3'><button className='btn btn-warning'>Get Started<i className="fa-solid fa-arrow-right ms-2"></i></button></Link>
       </Col>
        <Col sm={12} md={6}>
          <img style={{marginTop:'90px',marginLeft:'50px'}} className='w-75' src="https://pngimg.com/d/photo_camera_PNG101598.png" alt="" />
        </Col>
      </Row>
    </div>
</div>
<div style={{height:'380px'}} className='all-posts bg-light'>
    <h1 style={{fontSize:'50px'}} className='text-center text-info'>Explore Here</h1>
    <div className='d-flex justify-content-evenly'>
    <Link to={'/posts'}><img width={'300px'} src="https://cdni.iconscout.com/illustration/premium/thumb/camera-1884989-1597908.png?f=webp" alt="camera" /></Link>
    <Link to={'/users'}><img width={'320px'} src="https://cdni.iconscout.com/illustration/premium/thumb/user-rating-4118325-3414906.png" alt="camera" /></Link>
    </div>

</div>
<Footer/>
    </>
  )
}

export default Home