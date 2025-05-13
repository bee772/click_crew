import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../App.css";
import { Button, Card } from "react-bootstrap";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const img_url = "https://Mwangi10.pythonanywhere.com/static/images/";
  const navigate = useNavigate();

  // Function to get products
  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://Mwangi10.pythonanywhere.com/api/get_products"
      );
      console.log("API Response:", response.data); // Debug
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

  // Function to handle adding to cart with validation
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

    console.log("Adding to cart:", cartItem); // Debug
    addToCart(cartItem);
  };

  // Function to handle search
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
              <Card className="h-100 shadow-sm">
                <div className="text-center p-3">
                  <Card.Img
                    variant="top"
                    src={img_url + product.product_photo}
                    className="img-fluid product-image"
                    alt={product.product_name}
                    style={{
                      maxHeight: "200px",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.product_name}</Card.Title>
                  <Card.Text className="text-muted small">
                    {product.product_description}
                  </Card.Text>
                  <div className="mt-auto">
                    <h5 className="text-primary mb-3">
                      KSH {parseFloat(product.product_cost).toFixed(2)}
                    </h5>
                    <div className="d-grid gap-2">
                      <Button
                        variant="outline-dark"
                        onClick={() => handleAddToCart(product)}
                        className="mb-2"
                      >
                        Add to Cart 🛒
                      </Button>
                      <Button
                        variant="outline-success"
                        onClick={() =>
                          navigate("/Payment", { state: { product } })
                        }
                      >
                        Buy Now 💰
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
