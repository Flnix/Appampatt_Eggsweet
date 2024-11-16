import React from 'react';
import PhoneIcon from '../Images/telephone-fill.svg'; // Import the SVG as a path
import LocationIcon from '../Images/house-fill.svg';
import EmailIcon from '../Images/envelope-fill.svg';
import './Stylings/ContactCard.css';

export default function ContactCard() {
  return (
    <div className='contact-card bg-dark' style={{ backgroundColor: 'yellow', width:'100%' }}> {/* Inline style for testing */}
      <div className='contact-item'>
        <img src={PhoneIcon} alt="Phone Icon" className='contact-icon' />
        <p>Mobile: +91 6369715501</p>
      </div>
      <div className='contact-item'>
        <img src={LocationIcon} alt="Location Icon" className='contact-icon' />
        <p>Address: Opposite to Gemgrow Apartment, Wings Sports Academy Road, Padur, 627117</p>
      </div>
      <div className='contact-item'>
        <img src={EmailIcon} alt="Email Icon" className='contact-icon' />
        <p>Email: Appampattsweets@gmail.com</p>
      </div>
    </div>
  );
}
