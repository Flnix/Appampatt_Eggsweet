// src/components/ProductsCard.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Stylings/ProductCard.css';

// Function to format price to Indian number system
function formatPriceToINR(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export default function ProductsCard({ product, handleQuantityChange, quantity }) {
  // Function to increase quantity
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    handleQuantityChange(product.id, newQuantity);
  };

  // Function to decrease quantity and return to "ADD" button if it reaches 0
  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    handleQuantityChange(product.id, Math.max(0, newQuantity)); // Ensure quantity does not go below 0
  };

  // Function to set the initial quantity to 1 when "ADD" is clicked
  const handleAdd = () => {
    handleQuantityChange(product.id, 1); // Set quantity to 1 when ADD is clicked
  };

  return (
    <Card className="product-card">
      <Card.Img variant="top" className="square-img" src={product.img} />
      <Card.Body>
        <Card.Title className="card-title-small">{product.name}</Card.Title>
        <Card.Text className="product-weight">{product.weight}</Card.Text>
        
        {/* Display formatted price */}
        <Card.Text className="product-price">{formatPriceToINR(product.price)}</Card.Text>

        {/* Quantity selector */}
        <div className="quantity-selector">
          {quantity === 0 ? (
            <Button variant="primary" className="add-button" onClick={handleAdd}>
              ADD +
            </Button>
          ) : (
            <>
              <Button variant="secondary" className="decrement-button" onClick={handleDecrement}>-</Button>
              <Form.Control
                type="number"
                value={quantity}
                readOnly
                style={{ width: '50px', textAlign: 'center' }}
              />
              <Button variant="secondary" className="increment-button" onClick={handleIncrement}>+</Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
