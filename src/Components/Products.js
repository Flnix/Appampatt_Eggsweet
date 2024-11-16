import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ProductsCard from "./ProductsCard";
import "./Stylings/Products.css";
import NavBar from "./NavBar";
import CustomCarousel from "./CustomCarousel";
import ContactCard from "./ContactCard";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CurrentOffers from "./CurrentOffers";
import cartIcon from "../Images/cart2.svg";

export default function Products({
  products,
  quantities,
  handleAddToCart,
  currentOffers,
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeTab, setActiveTab] = useState("All Products");
  const [contentHeight, setContentHeight] = useState(null); // Store the dynamic height
  const allProductsRef = useRef(null); // Reference to All Products tab content

  const handleQuantityChange = (productId, quantity) => {
    handleAddToCart(productId, quantity);
  };

  useEffect(() => {
    const total = products.reduce((sum, product) => {
      const quantity = quantities[product.id] || 0;
      return quantity > 0 ? sum + product.price * quantity : sum;
    }, 0);
    setTotalPrice(total);
  }, [products, quantities]);

  // Calculate height dynamically after All Products tab renders
  useEffect(() => {
    if (allProductsRef.current) {
      const height = allProductsRef.current.offsetHeight;
      setContentHeight(height); // Set the height for both tabs
    }
  }, [products, quantities]);

  return (
    <div className="bg-light mt-4 pt-5">
      <NavBar />
      <CustomCarousel />

      {/* Use `activeKey` and `onSelect` to control the tabs */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        id="controlled-tab-example"
        className="Poppins justify-content-center custom-tabs"
      >
        <Tab eventKey="All Products" title="All Products">
          <div
            className="tab-content-wrapper"
            ref={allProductsRef} // Attach ref to calculate height
            style={{ minHeight: contentHeight ? `${contentHeight}px` : 'auto' }} // Apply dynamic height
          >
            <CurrentOffers
              quantities={quantities}
              currentOffers={currentOffers}
              handleQuantityChange={handleQuantityChange}
            />

            <Container
              fluid
              className="d-flex flex-column justify-content-start align-items-center mt-4"
            >
              <Container
                className="py-3"
                style={{ maxWidth: "790px", paddingBottom: "0" }}
              >
                <Row className="g-1">
                  {products.slice(2).map((product) => (
                    <Col
                      key={product.id}
                      xs={6}
                      md={4}
                      className="d-flex justify-content-center"
                    >
                      <ProductsCard
                        product={product}
                        handleQuantityChange={handleQuantityChange}
                        quantity={quantities[product.id] || 0}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            </Container>
          </div>
        </Tab>
        <Tab eventKey="Current Offers" title="Current Offers">
          <div
            className="tab-content-wrapper"
            style={{ minHeight: contentHeight ? `${contentHeight}px` : 'auto' }} // Apply the same height
          >
            <CurrentOffers
              quantities={quantities}
              currentOffers={currentOffers}
              handleQuantityChange={handleQuantityChange}
            />
          </div>
        </Tab>
      </Tabs>

      {totalPrice > 0 && (
        <div className="bottom-overlay">
          <span className="total-price">Total: ₹{totalPrice.toFixed(2)}</span>
          <Link to="/cart">
            <Button variant="success" className="show-cart-button">
              <img className="carticon" src={cartIcon} alt="icon" />
              Show Cart
            </Button>
          </Link>
        </div>
      )}

      <ContactCard />
    </div>
  );
}
