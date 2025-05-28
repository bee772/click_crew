import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCheckoutOptions, setShowCheckoutOptions] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const img_url = "https://Mwangi10.pythonanywhere.com/static/images/";
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + parseFloat(item.product_cost),
      0
    );
    setTotalCost(total);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setSelectedItem(null);
    setTotalCost(0);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    calculateTotal(updatedCart);

    if (selectedItem === indexToRemove) {
      setSelectedItem(null);
    } else if (selectedItem > indexToRemove) {
      setSelectedItem(selectedItem - 1);
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const proceedToPayment = () => {
    if (selectedItem === null && !showCheckoutOptions) {
      setShowCheckoutOptions(true);
      return;
    }

    if (selectedItem !== null) {
      const item = cartItems[selectedItem];
      navigate("/Payment", {
        state: {
          product: {
            ...item,
            product_image: img_url + item.product_photo,
          },
          isCartCheckout: false,
        },
      });
    } else {
      navigate("/Payment", {
        state: {
          cartItems,
          totalCost,
          isCartCheckout: true,
        },
      });
    }
  };

  const proceedToDelivery = () => {
    if (selectedItem === null && !showCheckoutOptions) {
      setShowCheckoutOptions(true);
      return;
    }

    if (selectedItem !== null) {
      const item = cartItems[selectedItem];
      navigate("/Delivery", {
        state: {
          product: {
            ...item,
            product_image: img_url + item.product_photo,
          },
          isCartCheckout: false,
        },
      });
    } else {
      navigate("/Delivery", {
        state: {
          cartItems,
          totalCost,
          isCartCheckout: true,
        },
      });
    }
  };

  const toggleSelectAll = () => {
    setSelectedItem(null);
    setShowCheckoutOptions(!showCheckoutOptions);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center text-primary mb-4">Your Shopping Cart</h3>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-muted fs-5">Your cart is empty.</p>
          <button className="btn btn-outline-success" onClick={() => navigate("/Products")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <span className="fw-bold">
                {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
              </span>
              <span className="mx-2">|</span>
              <span className="text-success fw-bold">
                Total: KSH {totalCost.toFixed(2)}
              </span>
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={toggleSelectAll}
              >
                {showCheckoutOptions ? "Cancel" : "Checkout Options"}
              </button>
              <button className="btn btn-sm btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>

          {showCheckoutOptions && (
            <div className="card mb-4 border-primary">
              <div className="card-body">
                <h5 className="card-title">Checkout Options</h5>
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-success flex-grow-1"
                    onClick={proceedToPayment}
                  >
                    Pay Now (Pick Up)
                  </button>
                  <button
                    className="btn btn-outline-primary flex-grow-1"
                    onClick={proceedToDelivery}
                  >
                    Pay with Delivery
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="row g-4">
            {cartItems.map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div
                  className={`card h-100 shadow-sm ${
                    selectedItem === index ? "border-primary border-2" : ""
                  }`}
                  onClick={() => setSelectedItem(index)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="position-relative">
                    <img
                      src={img_url + item.product_photo}
                      alt={item.product_name}
                      className="card-img-top"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200";
                      }}
                    />
                    {selectedItem === index && (
                      <div className="position-absolute top-0 end-0 m-2 bg-primary text-white rounded-circle p-2">
                        <i className="bi bi-check-lg"></i>
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.product_name}</h5>
                    <p className="text-warning fw-bold mb-2">
                      KSH {parseFloat(item.product_cost).toFixed(2)}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(index);
                        }}
                      >
                        Remove
                      </button>
                      {selectedItem === index ? (
                        <span className="text-success small">
                          Selected for checkout
                        </span>
                      ) : (
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(index);
                          }}
                        >
                          Select
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cartItems.length > 0 && (
            <div className="fixed-bottom bg-white p-3 border-top shadow-lg">
              <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">
                      Total:{" "}
                      <span className="text-success">
                        KSH {totalCost.toFixed(2)}
                      </span>
                    </h5>
                  </div>
                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-success px-4"
                      onClick={proceedToPayment}
                    >
                      Pay Now
                    </button>
                    <button
                      className="btn btn-outline-primary px-4"
                      onClick={proceedToDelivery}
                    >
                      Deliver To Me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
