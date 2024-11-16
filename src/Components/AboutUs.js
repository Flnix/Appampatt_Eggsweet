import React from 'react'
import NavBar from './NavBar'
import { Col, Image, Row } from 'react-bootstrap'
import '../Components/Stylings/basic.css'
import img1 from '../Images/about1.jpg'
import img2 from '../Images/about2.jpg'
import ContactCard from './ContactCard'

export default function AboutUs() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100"> {/* Flex container with min-height */}
        <NavBar/>
       
        <div className='container text-center flex-grow-1 pt-5'>
          <div className='pt-3 mt-5'>
          <h1 className="text-center mb-4 bg-white p-2 text-warning  abouttitle DancingScript">
    About Us
          </h1>
           
            <Row className='mt-5'>
              <Col>
                <Image src={img1} thumbnail />
              </Col>
              <Col>
                <Image src={img2} thumbnail />
              </Col>
            </Row>
            <p className='mt-5 Poppins abouttext'>
              Welcome to Appampatt Egg Sweet, where tradition meets indulgence! Our website showcases a delightful array of egg-based sweets, crafted with love and the finest ingredients. Each treat is a celebration of flavor, blending the richness of eggs with aromatic spices and natural sweetness. Explore our signature creations, learn about our artisanal methods, and discover the joy of indulging in these unique delicacies. Whether you're treating yourself or searching for the perfect gift, Appampatt Egg Sweet promises a delicious experience that will leave you craving more!
            </p>
          </div>
        </div>
        <div className='mt-auto'> {/* Use mt-auto to push ContactCard to the bottom */}
          <ContactCard className='contact-card'/>
        </div>
      </div>
    </>
  )
}
