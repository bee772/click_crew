import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";

const Payments = () => {
  const { product } = useLocation().state || {};
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const img_url = "https://Mwangi10.pythonanywhere.com/static/images/";

  // Redirect if product doesn't exist
  if (!product) {
    navigate("/"); // or wherever products are listed
    return null;
  }

  const submit = async (e) => {
    e.preventDefault();
    setMessage("Please wait as we process your payment");

    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", product.product_cost);

      const response = await axios.post(
        "https://Mwangi10.pythonanywhere.com/api/mpesa_payment",
        data
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Payment failed. Please try again.");
      console.error("Payment error:", error);
    }
  };

  // Construct the full image URL
  const productImageUrl = product.product_photo.startsWith("http")
    ? product.product_photo
    : img_url + product.product_photo;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 card shadow p-4">
          <form onSubmit={submit}>
            <h3 className="pay text-center mb-4 text-success">Lipa na Mpesa</h3>

            {message && (
              <div
                className={`alert ${
                  message.includes("failed") ? "alert-danger" : "alert-info"
                }`}
              >
                {message}
              </div>
            )}

            <div className="row align-items-center">
              {/* Left Side: Product Image */}
              <div className="col-md-6 text-center mb-4 mb-md-0">
                <img
                  src={productImageUrl}
                  alt={product.product_name}
                  className="img-fluid rounded"
                  style={{
                    maxHeight: "300px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://Mwangi10.pythonanywhere.com/static/images/";
                  }}
                />
                <h5 className="mt-3">{product.product_name}</h5>
                <h4 className="text-primary">
                  KSH {parseFloat(product.product_cost).toFixed(2)}
                </h4>
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
                    Enter Phone Number to pay from (starts with 254*********)
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-outline-success btn-lg w-100 py-3"
                  disabled={message.includes("Please wait")}
                >
                  {message.includes("Please wait") ? (
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
