import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Eg from '../Images/sweet1.jpg'
import Eg2 from '../Images/sweet2.jpg'
import Eg3 from '../Images/sweet3.jpg'

import './Stylings/CustomCarousel.css'; // Import the CSS file

export default function CustomCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="carousel-container"> 
            <div className="carousel-wrapper"> {/* Wrapper without fixed aspect ratio */}
                <Carousel activeIndex={index} onSelect={handleSelect} className="custom-carousel">
                    <Carousel.Item>
                        <img src={Eg} alt="First slide" className="carousel-image" /> {/* Image styling */}
                        <Carousel.Caption>
                            <h2 className='DancingScript'>Crack Open the Sweetness</h2>
                            
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={Eg2} alt="Second slide" className="carousel-image" />
                        <Carousel.Caption>
                            <h2 className='DancingScript'>Pure Eggstasy in Every Bite</h2>
        
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={Eg3} alt="Third slide" className="carousel-image" />
                        <Carousel.Caption>
                            <h2 className='DancingScript'>Break into Sweet Bliss</h2>
                           
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
}
