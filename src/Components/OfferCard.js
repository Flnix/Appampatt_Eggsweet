import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Stylings/ProductCard.css";

// Helper function to format price to INR
function formatPriceToINR(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export default function OfferCard({ product, handleQuantityChange, quantity }) {
  // Function to handle incrementing quantity
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    handleQuantityChange(product.id, newQuantity);
  };

  // Function to handle decrementing quantity
  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      handleQuantityChange(product.id, newQuantity);
    }
  };

  return (
    <Card className="larger-product-card">
      <Card.Img variant="top" className="square-img" src={product.img} />
      <Card.Body>
        <Card.Title className="card-title-large">{product.name}</Card.Title>
        <Card.Text className="product-weight">{product.weight}</Card.Text>
        <Card.Text className="product-price">{formatPriceToINR(product.price)}</Card.Text>
      </Card.Body>
      
      <div className="quantity-selector">
        {/* Display "ADD" button when quantity is 0 */}
        {quantity === 0 ? (
          <Button className="add-button" variant="primary" onClick={handleIncrement}>
            ADD +
          </Button>
        ) : (
          // Display quantity controls when quantity is greater than 0
          <>
            <Button variant="secondary" onClick={handleDecrement}>
              -
            </Button>
            <Form.Control
              type="number"
              value={quantity}
              readOnly
              style={{ width: "50px", textAlign: "center" }}
            />
            <Button variant="secondary" onClick={handleIncrement}>
              +
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
