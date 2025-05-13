import React from "react";
import { Button, ListGroup, Badge, Alert, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();
  const img_url = "https://Mwangi10.pythonanywhere.com/static/images/";

  // Debug what the component receives
  console.log("Cart component received:", { cartItems, removeFromCart });

  const calculateTotal = () => {
    if (!Array.isArray(cartItems)) return "0.00";

    return cartItems
      .reduce((total, item) => {
        const cost = parseFloat(item?.product_cost || 0);
        if (isNaN(cost)) {
          console.error("Invalid product cost:", item?.product_cost);
          return total;
        }
        return total + cost;
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const validItems = cartItems.filter(
      (item) =>
        item?.product_id &&
        item?.product_name &&
        !isNaN(parseFloat(item?.product_cost))
    );

    if (validItems.length !== cartItems.length) {
      alert(
        "Some items in your cart are invalid. Please remove them before checkout."
      );
      return;
    }

    navigate("/Payment", {
      state: {
        cartItems: validItems,
        total: calculateTotal(),
      },
    });
  };

  const handleRemoveItem = (productId) => {
    if (typeof removeFromCart !== "function") {
      console.error("removeFromCart is not a function");
      return;
    }
    removeFromCart(productId);
  };

  if (!cartItems) {
    return (
      <div className="container mt-4">
        <Alert variant="info">Loading cart...</Alert>
      </div>
    );
  }

  if (!Array.isArray(cartItems)) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">Invalid cart data</Alert>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4">
        <Alert variant="warning">
          Your cart is empty!{" "}
          <Button variant="link" onClick={() => navigate("/Getproducts")}>
            Browse products
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Shopping Cart</h2>

      <ListGroup className="mb-4">
        {cartItems.map((item, index) => (
          <ListGroup.Item
            key={`${item.product_id}_${index}`}
            className="d-flex justify-content-between align-items-center p-3"
          >
            <div className="d-flex align-items-center" style={{ width: "75%" }}>
              <Image
                src={img_url + (item.product_photo || "default.jpg")}
                alt={item.product_name}
                thumbnail
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  marginRight: "20px",
                }}
                onError={(e) => {
                  e.target.src = img_url + "default.jpg";
                }}
              />
              <div>
                <h5>{item.product_name || "Unnamed Product"}</h5>
                <p className="text-muted">
                  {item.product_description || "No description"}
                </p>
                <h6 className="text-primary">
                  KSH {parseFloat(item.product_cost || 0).toFixed(2)}
                </h6>
              </div>
            </div>

            <Button
              variant="outline-danger"
              onClick={() => handleRemoveItem(item.product_id)}
              size="sm"
            >
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded">
        <h4 className="mb-0">Total:</h4>
        <Badge bg="primary" pill style={{ fontSize: "1.25rem" }}>
          Ksh {calculateTotal()}
        </Badge>
      </div>

      <div className="d-grid gap-2">
        <Button variant="success" size="lg" onClick={handleCheckout}>
          Proceed to Checkout 💳
        </Button>
        <Button variant="outline-primary" onClick={() => navigate("/Products")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      product_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      product_name: PropTypes.string,
      product_description: PropTypes.string,
      product_cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      product_photo: PropTypes.string,
    })
  ),
  removeFromCart: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  cartItems: [],
};

export default Cart;
