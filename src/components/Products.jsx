import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../App.css";
import bootstrap from "bootstrap/dist/js/bootstrap.js";
import { Button } from "react-bootstrap"; // Added back the Button import

const Products = ({ addToCart: propAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const img_url = "https://Mwangi10.pythonanywhere.com/static/images/";
  const navigate = useNavigate();

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

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddToCart = (product) => {
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

    addToCart(cartItem);
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
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
        <h3>Products Available</h3>
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
                className="card"
                style={{
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                  height: "100%",
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
                    <div className="action d-flex justify-content-between align-items-center">
                      <div className="price">
                        <span style={{ fontWeight: "bold", color: "#28a745" }}>
                          KSH {parseFloat(product.product_cost).toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="cart-button btn btn-sm"
                        onClick={() => handleAddToCart(product)}
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
                    <Button
                      variant="success"
                      className="w-100 mt-2"
                      onClick={() =>
                        navigate("/Payment", { state: { product } })
                      }
                    >
                      Buy Now
                    </Button>
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
