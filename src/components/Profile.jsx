import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import Mypost from './Mypost'
import { Col, Row } from 'react-bootstrap'
import Header from './Header'
import { userPostAPI } from '../services/allApi'
import Addpost from './Addpost'

function Profile() {
  
  return (
    <>
    <Header insideDashboard/>
      <Row className='container-fluid' >
        <Col sm={12} md={6} >
          <Dashboard/>
         </Col>
         <Col sm={12} md={6}>
            <Mypost/>
            <button style={{float:'right'}} className='btn btn-success mt-2 p-1'><Addpost/></button>
          </Col>
          </Row>
      
    </>
  )
}

export default Profile