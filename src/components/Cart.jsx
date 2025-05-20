import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const img_url = "https://Mwangi10.pythonanywhere.com/static/images/";
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setSelectedItem(null);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    // Reset selection if the selected item was removed
    if (selectedItem === indexToRemove) {
      setSelectedItem(null);
    } else if (selectedItem > indexToRemove) {
      // Adjust selection index if items before it were removed
      setSelectedItem(selectedItem - 1);
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const proceedToPayment = () => {
    if (selectedItem === null) return;

    const item = cartItems[selectedItem];
    navigate("/Payment", {
      state: {
        product: {
          ...item,
          product_image: img_url + item.product_photo,
        },
        isCartCheckout: false, // This is now a single product payment
      },
    });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center text-primary">Your Shopping Cart</h3>

      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <>
          <div className="text-center mb-4">
            <button className="btn btn-danger me-3" onClick={clearCart}>
              Clear Cart
            </button>
            <button
              className="btn btn-success"
              onClick={proceedToPayment}
              disabled={selectedItem === null}
            >
              Pay for Selected Item
            </button>
          </div>

          <div className="row g-4">
            {cartItems.map((item, index) => (
              <div key={index} className="col-md-4">
                <div
                  className={`card h-100 shadow-sm ${
                    selectedItem === index ? "border-primary border-2" : ""
                  }`}
                  onClick={() => setSelectedItem(index)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={img_url + item.product_photo}
                    alt={item.product_name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.product_name}</h5>
                    <p className="text-warning fw-bold">
                      {item.product_cost} KES
                    </p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-outline-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(index);
                        }}
                      >
                        Remove
                      </button>
                      {selectedItem === index && (
                        <span className="text-success align-self-center">
                          <i className="bi bi-check-circle-fill"></i> Selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
