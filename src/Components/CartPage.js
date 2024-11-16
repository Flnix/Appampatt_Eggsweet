import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./Stylings/CartPage.css";
import ContactCard from "./ContactCard";
import CartIcon from "../Images/cart3(yellow).svg";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import DeleteIcon from "../Images/trash-fill.svg";
import PaymentOverlay from "./PaymentOverlay"; // Import the PaymentOverlay component

export default function CartPage({ cartItems, handleClearCart, handleRemoveItem }) {
  const [OrderDetails, setOrderDetails] = useState({
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    Address: "",
    Pincode: "",
    MobileNumber: "",
    AltMobileNumber: "",
  });

  const [isFormValid, setIsFormValid] = useState(false); // State to track form validation
  const [showOverlay, setShowOverlay] = useState(false); // State to handle overlay visibility

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);

  const handleProceedToPayment = () => {
    setShowOverlay(true); // Show the overlay
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false); // Hide the overlay
  };

  // Move form validation directly into useEffect
  useEffect(() => {
    const { FirstName, LastName, EmailAddress, Address, Pincode, MobileNumber } = OrderDetails;
    const isValid =
      FirstName.trim() &&
      LastName.trim() &&
      EmailAddress.trim() &&
      Address.trim() &&
      Pincode.trim() &&
      MobileNumber.trim();
    setIsFormValid(isValid);
  }, [OrderDetails]); // Trigger validation when OrderDetails changes

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />

      <div className="cart-page-container">
        <Container className="cart-content py-3 pt-5 mt-5" style={{ maxWidth: "1000px" }}>
          <h1 className="text-center mb-4 titleHeads Poppins p-2">
            <img className="cartIcon" src={CartIcon} alt="icon" /> Your Cart
          </h1>

          {cartItems.length === 0 ? (
            <p className="text-center">No items in the cart. Please add some products.</p>
          ) : (
            <Table bordered hover responsive className="text-center mb-4">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product.dname}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.product.price.toFixed(2)}</td>
                    <td>₹{(item.quantity * item.product.price).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="btn btn-link p-0"
                      >
                        <img
                          src={DeleteIcon}
                          alt="Delete"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5>Total Items: {totalItems}</h5>
            <h5>Total Price: ₹{totalPrice.toFixed(2)}</h5>
          </div>

          {cartItems.length > 0 && (
            <div className="d-flex justify-content-end mb-4">
              <Button variant="danger" className="clearcartbtn" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          )}
        </Container>

        {cartItems.length > 0 && (
          <Container className="form-container my-4" style={{ maxWidth: "800px" }}>
            <h1 className="text-center mb-4 p-2 titleHeads Poppins">
              <img className="cartIcon" src={CartIcon} alt="icon" /> Contact Information
            </h1>
            <div className="mt-3">
              <Form className="Poppins">
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Control
                        placeholder="First name"
                        value={OrderDetails.FirstName}
                        onChange={(e) =>
                          setOrderDetails({ ...OrderDetails, FirstName: e.target.value })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        placeholder="Last name"
                        value={OrderDetails.LastName}
                        required
                        onChange={(e) =>
                          setOrderDetails({ ...OrderDetails, LastName: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    value={OrderDetails.EmailAddress}
                    required
                    onChange={(e) =>
                      setOrderDetails({ ...OrderDetails, EmailAddress: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Delivery Address"
                    value={OrderDetails.Address}
                    required
                    onChange={(e) =>
                      setOrderDetails({ ...OrderDetails, Address: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPincode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pincode"
                    required
                    value={OrderDetails.Pincode}
                    onChange={(e) =>
                      setOrderDetails({ ...OrderDetails, Pincode: e.target.value })
                    }
                  />
                </Form.Group>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
                  <Form.Control
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={OrderDetails.MobileNumber}
                    onChange={(e) =>
                      setOrderDetails({ ...OrderDetails, MobileNumber: e.target.value })
                    }
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
                  <Form.Control
                    type="tel"
                    placeholder="Alternative Phone Number"
                    value={OrderDetails.AltMobileNumber}
                    onChange={(e) =>
                      setOrderDetails({ ...OrderDetails, AltMobileNumber: e.target.value })
                    }
                  />
                </InputGroup>
              </Form>
              <div className="d-flex justify-content-between mt-3">
                <Link to="/" className="flex-grow-1 me-2">
                  <Button variant="secondary" className="w-100 back-button">
                    Back to Products
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  className="w-100 payment-button"
                  onClick={handleProceedToPayment}
                  disabled={!isFormValid || totalPrice === 0}
                >
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </Container>
        )}

        <ContactCard className="contact-card" />

        {/* PaymentOverlay */}
        {showOverlay && <PaymentOverlay
    onClose={handleCloseOverlay}
    OrderDetails={OrderDetails}
    totalPrice={totalPrice}
    cartItems={cartItems} // Pass cart items
  />}
      </div>
    </>
  );
}
