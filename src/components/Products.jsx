import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../App.css";
import bootstrap from "bootstrap/dist/js/bootstrap.js";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const Products = ({ addToCart: propAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const img_url = "https://Mwangi10.pythonanywhere.com/static/images/";

  useEffect(() => {
    getProducts();
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://Mwangi10.pythonanywhere.com/api/get_products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (product, action) => {
    if (!user) {
      setSelectedProduct(product);
      setActionType(action);
      setShowLoginModal(true);
      return;
    }

    switch (action) {
      case "addToCart":
        addToCart(product);
        break;
      case "buyNow":
        navigate("/Payment", { state: { product } });
        break;
      case "getDelivery":
        navigate("/Delivery", { state: { product } });
        break;
      default:
        break;
    }
  };

  const proceedToLogin = () => {
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    setShowLoginModal(false);
    navigate("/Signin");
  };

  const getActionMessage = () => {
    switch (actionType) {
      case "addToCart":
        return "add this item to your cart";
      case "buyNow":
        return "purchase this item";
      case "getDelivery":
        return "arrange delivery for this item";
      default:
        return "perform this action";
    }
  };

  const addToCart = (product) => {
    if (!product.product_id) {
      console.error("Product is missing ID:", product);
      return;
    }

    const cartItem = {
      product_id: product.product_id,
      product_name: product.product_name,
      product_description: product.product_description,
      product_cost: product.product_cost,
      product_photo: product.product_photo,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));

    const alertMessage = document.createElement("div");
    alertMessage.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        Added "${product.product_name}" to cart. 
        <a href="/Cart" class="alert-link">View your orders</a>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

    alertMessage.style.position = "fixed";
    alertMessage.style.top = "20px";
    alertMessage.style.right = "20px";
    alertMessage.style.zIndex = "9999";
    alertMessage.style.width = "300px";

    document.body.appendChild(alertMessage);

    setTimeout(() => {
      const bsAlert = new bootstrap.Alert(alertMessage.querySelector(".alert"));
      bsAlert.close();
    }, 5000);
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container alert alert-danger mt-5">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Login Modal */}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You need to login to {getActionMessage()}.</p>
          <p>
            Item: <strong>{selectedProduct?.product_name}</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={proceedToLogin}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="alert alert-info mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Want to sell your own products?</strong> Register now to
            list your items for sale!
          </div>
          <Link to="/Signup" className="btn btn-sm btn-outline-primary">
            Register to Sell
          </Link>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Products Available</h3>
        <div style={{ width: "300px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="alert alert-info text-center">
          {searchTerm
            ? "No products match your search."
            : "No products available."}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {filteredProducts.map((product) => (
            <div className="col" key={product.product_id}>
              <div
                className="card h-100"
                style={{
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                }}
              >
                <div
                  className="image_container p-3"
                  style={{
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "10px 10px 0 0",
                  }}
                >
                  <img
                    src={img_url + product.product_photo}
                    className="img-fluid"
                    alt={product.product_name}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/200";
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="title mb-2">
                    <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      {product.product_name}
                    </span>
                  </div>
                  <div
                    className="text-muted small mb-3"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {product.product_description}
                  </div>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="price">
                        <span style={{ fontWeight: "bold", color: "#28a745" }}>
                          KSH {parseFloat(product.product_cost).toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="cart-button btn btn-sm"
                        onClick={() => handleActionClick(product, "addToCart")}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          backgroundColor: "#000",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          padding: "5px 10px",
                        }}
                      >
                        <svg
                          className="cart-icon"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            width: "16px",
                            height: "16px",
                          }}
                        >
                          <path
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          ></path>
                        </svg>
                        <span>Add to cart</span>
                      </button>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        variant="success"
                        className="flex-grow-1"
                        onClick={() => handleActionClick(product, "buyNow")}
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="outline-primary"
                        className="flex-grow-1"
                        onClick={() =>
                          handleActionClick(product, "getDelivery")
                        }
                      >
                        Get Delivery
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
