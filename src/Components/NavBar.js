import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

// import NavDropdown from "react-bootstrap/NavDropdown";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import HeaderLogo from '../Images/HeaderLogoImage.png'

export default function NavBar() {
  return (
    <Navbar fixed='top' expand="lg" className="bg-body-tertiary " data-bs-theme="dark">
      <Container>
      <Navbar.Brand as={Link} to="/">
            <img
              src= {HeaderLogo}
              width="180"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop">Order Now</Nav.Link>
        
            <Nav.Link as={Link} to="/media">Media</Nav.Link>
            <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
