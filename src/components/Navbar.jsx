import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import click from "../assets/images/click.png";

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <span className="imgspan">
            <img
              src={click}
              alt="logo"
              className="headerimg"
              style={{ height: "30px" }}
            />
          </span>
          <b className="text-success ms-2">CLICK-CREW</b>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                onClick={() => isMobile && setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className="nav-link"
                onClick={() => isMobile && setIsOpen(false)}
              >
                Buy
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Upload"
                className="nav-link"
                onClick={() => isMobile && setIsOpen(false)}
              >
                Upload Product
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/Signup"
                className="nav-link"
                onClick={() => isMobile && setIsOpen(false)}
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Signin"
                className="nav-link"
                onClick={() => isMobile && setIsOpen(false)}
              >
                Signin
              </Link>
            </li>
            <li className="nav-item position-relative">
              <Link
                to="/cart"
                className="nav-link"
                onClick={() => isMobile && setIsOpen(false)}
              >
                Orders
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
