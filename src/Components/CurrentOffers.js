import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OfferCard from './OfferCard'; // Import OfferCard component

export default function CurrentOffers({ currentOffers, handleQuantityChange, quantities }) {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-start align-items-center mt-4"
      style={{  paddingBottom: '0' }} // Remove padding bottom
    >
      <Container fluid className="" style={{ width: '100%', paddingBottom: '0' }}> {/* Remove padding bottom */}
        <Row className="g-2 justify-content-center">
          {/* Iterate over currentOffers object to display each product */}
          {currentOffers.map((offer) => (
            <Col
              key={offer.id}
              xs={12} // Full width on extra-small screens
              sm={6}  // 2 items per row for small screens
              md={4}  // 3 items per row for medium screens
              lg={3}  // 4 items per row for large screens
              className="d-flex justify-content-center"
            >
              <OfferCard
                product={offer} // Pass the offer object to the OfferCard component
                handleQuantityChange={handleQuantityChange}
                quantity={quantities[offer.id] || 0} // Display quantity from the quantities prop
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}
