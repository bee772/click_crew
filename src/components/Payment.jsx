import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";

const Payments = () => {
  const location = useLocation();
  const { product, cartItems, totalCost, isCartCheckout } =
    location.state || {};
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const defaultImage = "https://Mwangi10.pythonanywhere.com/static/images/";

  // Redirect if no payment data exists
  if (!product && !cartItems) {
    navigate("/");
    return null;
  }

  const submit = async (e) => {
    e.preventDefault();
    setMessage("Please wait as we process your payment");
    setIsProcessing(true);

    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", isCartCheckout ? totalCost : product.product_cost);

      const response = await axios.post(
        "https://Mwangi10.pythonanywhere.com/api/mpesa_payment",
        data
      );

      setMessage(response.data.message || "Payment initiated successfully");

      // Clear cart if payment was successful and coming from cart
      if (isCartCheckout && response.data.success) {
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Payment failed. Please try again."
      );
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getImageUrl = (item) => {
    if (item.product_image) return item.product_image;
    if (item.product_photo?.startsWith("http")) return item.product_photo;
    return defaultImage + (item.product_photo || "");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 card shadow p-4">
          <form onSubmit={submit}>
            <h3 className="pay text-center mb-4 text-success">Lipa na Mpesa</h3>

            {message && (
              <div
                className={`alert ${
                  message.toLowerCase().includes("fail")
                    ? "alert-danger"
                    : "alert-info"
                }`}
              >
                {message}
              </div>
            )}

            <div className="row align-items-center">
              {/* Left Side: Product/Cart Summary */}
              <div className="col-md-6 text-center mb-4 mb-md-0">
                {isCartCheckout ? (
                  <>
                    <h4>Cart Summary</h4>
                    <p>
                      {cartItems.length}{" "}
                      {cartItems.length === 1 ? "item" : "items"} in cart
                    </p>
                    <div
                      className="cart-items-container"
                      style={{ maxHeight: "300px", overflowY: "auto" }}
                    >
                      {cartItems.map((item, index) => (
                        <div
                          key={index}
                          className="mb-3 d-flex align-items-center"
                        >
                          <img
                            src={getImageUrl(item)}
                            alt={item.product_name}
                            className="img-thumbnail me-2"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.src = defaultImage;
                            }}
                          />
                          <div className="text-start">
                            <div className="fw-bold">{item.product_name}</div>
                            <div>
                              KSH {parseFloat(item.product_cost).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <h4 className="text-primary mt-3">
                      Total: KSH {parseFloat(totalCost).toFixed(2)}
                    </h4>
                  </>
                ) : (
                  <>
                    <img
                      src={getImageUrl(product)}
                      alt={product.product_name}
                      className="img-fluid rounded mb-3"
                      style={{
                        maxHeight: "200px",
                        width: "auto",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.target.src = defaultImage;
                      }}
                    />
                    <h5 className="mt-2">{product.product_name}</h5>
                    <h4 className="text-success">
                      KSH {parseFloat(product.product_cost).toFixed(2)}
                    </h4>
                  </>
                )}
              </div>

              {/* Right Side: Input and Button */}
              <div className="col-md-6">
                <div className="mb-4">
                  <h4 className="here mb-3">Pay here</h4>
                  <input
                    type="tel"
                    placeholder="Enter Phone Number (254...)"
                    className="form-control form-control-lg"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    pattern="254[0-9]{9}"
                    title="Phone number must start with 254 followed by 9 digits"
                  />
                  <p className="text-muted mt-2 small">
                    Enter Phone Number to pay from (format: 254XXXXXXXXX)
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100 py-3"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    "Purchase Now"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payments;
