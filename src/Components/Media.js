import React from 'react'
import NavBar from './NavBar'
import '../Components/Stylings/basic.css'


import '../Components/Stylings/Media.css'
import ContactCard from './ContactCard'
import insta from '../Images/insta.jpg'

export default function Media() {
  
  return (
    <>
      <div className="d-flex flex-column min-vh-100"> {/* Flex container with min-height */}
        <NavBar/>
       
        <div className='container text-center flex-grow-1 pt-5'>
          <div className='pt-3 mt-5'>
          <h1 className="text-center mb-4 bg-white p-2 text-warning  abouttitle DancingScript">
    Connect With Us
          </h1>
           
            
          <div className="social-media-container">
    
      <a
        href="https://www.instagram.com/appampatt_sweets/"
        target="_blank"
        rel="noopener noreferrer"
        title="Visit us on Instagram"
      >
        <img
          src={insta}
          alt="Instagram"
          className="social-logo"
        />
      </a>
    </div>
          </div>
        </div>
        <div className='mt-auto'> {/* Use mt-auto to push ContactCard to the bottom */}
          <ContactCard className='contact-card'/>
        </div>
      </div>
    </>
  )
}
