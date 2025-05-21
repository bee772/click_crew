import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optional: Clear cart if needed
    // localStorage.removeItem('cart');

    // Redirect to home page after a brief delay
    const timer = setTimeout(() => {
      navigate("/");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h3>Logging out...</h3>
      <p>You're being safely logged out of your account.</p>
    </div>
  );
};

export default Logout;
