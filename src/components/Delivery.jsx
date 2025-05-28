import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const img_url = "https://Mwangi10.pythonanywhere.com/static/images/";

const Delivery = () => {
  const location = useLocation();
  const { product, cartItems, totalCost, isCartCheckout } =
    location.state || {};
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    city: "",
    county: "",
    additionalNotes: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Redirect if no payment data exists
  if (!product && !cartItems) {
    navigate("/");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const proceedToPayment = () => {
    if (!deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.county) {
      setMessage("Please fill in all required delivery information");
      return;
    }

    navigate("/Payment", {
      state: {
        ...location.state,
        deliveryInfo,
      },
    });
  };

  const renderProductImage = (photo) => (
    <img
      src={img_url + photo}
      alt="Product"
      className="img-fluid mb-3 rounded"
      style={{ maxHeight: "150px", objectFit: "contain" }}
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/150";
      }}
    />
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 card shadow p-4">
          <h3 className="text-center mb-4 text-success">
            Delivery Information
          </h3>

          {message && <div className="alert alert-danger">{message}</div>}

          <div className="row">
            {/* Left Side: Product/Cart Summary */}
            <div className="col-md-6 mb-4 mb-md-0">
              {isCartCheckout ? (
                <>
                  <h4 className="text-light">Cart Summary</h4>
                  {cartItems.length > 0 &&
                    renderProductImage(cartItems[0].product_photo)}
                  <p>
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"} in cart
                  </p>
                  <div className="mb-3">
                    <strong>Total:</strong> KSH{" "}
                    {parseFloat(totalCost).toFixed(2)}
                  </div>
                </>
              ) : (
                <>
                  <h4>Product Summary</h4>
                  {renderProductImage(product.product_photo)}
                  <div className="mb-2">
                    <strong>Product:</strong> {product.product_name}
                  </div>
                  <div className="mb-3">
                    <strong>Price:</strong> KSH{" "}
                    {parseFloat(product.product_cost).toFixed(2)}
                  </div>
                </>
              )}
            </div>

            {/* Right Side: Delivery Form */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Address*</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City/Town*</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={deliveryInfo.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">County*</label>
                <input
                  type="text"
                  className="form-control"
                  name="county"
                  value={deliveryInfo.county}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Additional Notes</label>
                <textarea
                  className="form-control"
                  name="additionalNotes"
                  value={deliveryInfo.additionalNotes}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={proceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
