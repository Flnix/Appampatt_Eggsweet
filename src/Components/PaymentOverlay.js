import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import qrcode from "../Images/QRCode.png";
import "./Stylings/PaymentOverlay.css"
import nodemailer from "nodemailer";

export default function PaymentOverlay({ onClose, OrderDetails, totalPrice, cartItems }) {
  const [upiId] = useState("6369715501-b7bb@axl");
  const [token, setToken] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentDone, setPaymentDone] = useState(false); // Track payment status

  // Generate token on component mount
  useEffect(() => {
    const generateToken = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
    setToken(generateToken());

    // Prevent background scrolling when overlay is open
    document.body.classList.add('overlay-active');

    // Clean up when the overlay is closed
    return () => {
      document.body.classList.remove('overlay-active');
    };
  }, []);

  // Copy text to clipboard
  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => console.log(`${text} copied to clipboard!`))
        .catch(err => console.log("Failed to copy: " + err));
    } else {
      // Fallback if Clipboard API is not supported
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      console.log(`${text} copied to clipboard!`);
    }
  };

  // Shoot Mail via smtp
  const sendEmail = async (emailDetails) => {
  // Create a transporter using Zoho Mail's SMTP configuration
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com", // Zoho SMTP server
    port: 465, // SMTP port for Zoho
    secure: true, // Use SSL/TLS
    auth: {
      user: "admin@appampattsweets.in", // Replace with your Zoho email
      pass: "qXjVh2va639F", // Replace with your Zoho app-specific password
    },
  });

  // Define the mail options
  const mailOptions = {
    from: "your-email@zoho.com", // Sender's email address
    to: emailDetails.userEmail, // Recipient's email address (user's email)
    subject: "Payment Verification - Order Details",
    html: `
      <h3>Thank you for your payment!</h3>
      <p>Dear Customer,</p>
      <p>Your payment for the order has been received. Below are your order details:</p>
      <ul>
        <li><strong>Order Token:</strong> ${emailDetails.Token}</li>
        <li><strong>Total Amount Paid:</strong> ₹${emailDetails.AmountPaid}</li>
        <li><strong>Ordered Items:</strong></li>
        <ul>
          ${emailDetails.OrderedItems.map(
            (item) =>
              `<li>${item.ProductName} (Quantity: ${item.Quantity})</li>`
          ).join("")}
        </ul>
      </ul>
      <p>We will notify you once your order is processed.</p>
      <p>Thank you for shopping with us!</p>
    `,
  };


  // Handle payment submission
  const handlePaymentDone = async () => {
    setPaymentDone(true); // Mark payment as done to disable button

    setPaymentMessage(
      "Payment is in the verification process. You'll be notified via your Email ID. Thank you!"
    );

    const payload = {
      ...OrderDetails,
      Token: token,
      AmountPaid: totalPrice.toFixed(2),
      OrderedItems: cartItems.map(item => ({
        ProductName: item.product.dname,
        Quantity: item.quantity
      })),
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw3BZ4GRiddACi5awwo652VWZ3FqcuNLTfmj4K-ACnf4s9RXXQaBnXFtqWJ7I2JrRlfWQ/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          mode: "no-cors", // Allow the fetch to follow redirects
        }
      );
      //calling mil function
      await sendEmail(payload);
      // You can handle the response here if needed
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Error submitting details. Please try again.");
      setPaymentDone(false); // If there was an error, reset the button state
    }
  };

  return (
    <div className="overlay-container mt-3">
      <div className="overlay">
        <div className="payment-modal">
          <h4>Scan QR or Use the Details Below</h4>

          <div className="qr-placeholder">
            <img src={qrcode} alt="QR Code" />
          </div>
          <h4>Total Price : ₹{totalPrice.toFixed(2)}</h4> {/* Display the total price */}

          <Form.Group className="mb-3">
            <Form.Label>UPI ID</Form.Label>
            <div className="d-flex">
              <Form.Control type="text" value={upiId} readOnly />
              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={() => copyToClipboard(upiId)}
              >
                Copy
              </Button>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Token</Form.Label>
            <div className="d-flex">
              <Form.Control type="text" value={token} readOnly />
              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={() => copyToClipboard(token)}
              >
                Copy
              </Button>
            </div>
          </Form.Group>

          <div className="alert alert-warning mt-3">
            <strong>Note:</strong> Please copy the token and include it in the payment reference or remarks section while making the payment. This will help us verify your transaction faster.
          </div>

          {/* Disable the button after payment is done */}
          <Button
            variant="warning"
            className="mt-3 me-2"
            onClick={handlePaymentDone}
            disabled={paymentDone} // Disable the button if payment is done
          >
            {paymentDone ? "Payment in Process..." : "Payment Done"} {/* Change button text */}
          </Button>

          <Button variant="dark" className="mt-3" onClick={onClose}>
            Close
          </Button>

          {paymentMessage && (
            <div className="mt-3 text-success">{paymentMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}
