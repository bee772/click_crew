import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import click from "../assets/images/click.png";

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedUser = localStorage.getItem("user");
      try {
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        setUser(parsedUser);
      } catch (err) {
        console.error("Invalid user data in localStorage");
        setUser(null);
      }
    };

    loadUserFromStorage();

    const handleStorageChange = () => {
      loadUserFromStorage();
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // optional
    setUser(null);
    if (isMobile) setIsOpen(false);
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
                className="nav-link px-3 py-2 rounded mx-1"
                onClick={() => isMobile && setIsOpen(false)}
                style={{
                  transition: "all 0.3s ease",
                  color: "#f8f9fa",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/products"
                className="nav-link px-3 py-2 rounded mx-1"
                onClick={() => isMobile && setIsOpen(false)}
                style={{
                  transition: "all 0.3s ease",
                  color: "#f8f9fa",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Buy
              </Link>
            </li>

            <li className="nav-item position-relative">
              <Link
                to="/cart"
                className="nav-link px-3 py-2 rounded mx-1"
                onClick={() => isMobile && setIsOpen(false)}
                style={{
                  transition: "all 0.3s ease",
                  color: "#f8f9fa",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
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

            {user && (
              <li className="nav-item">
                <Link
                  to="/Upload"
                  className="nav-link px-3 py-2 rounded mx-1"
                  onClick={() => isMobile && setIsOpen(false)}
                  style={{
                    transition: "all 0.3s ease",
                    color: "#f8f9fa",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Upload Product
                </Link>
              </li>
            )}

            <ul className="navbar-nav">
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/Signup"
                      className="nav-link px-3 py-2 rounded mx-1"
                      onClick={() => isMobile && setIsOpen(false)}
                      style={{
                        transition: "all 0.3s ease",
                        color: "#f8f9fa",
                        backgroundColor: "rgba(13, 110, 253, 0.7)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(67, 95, 97, 0.9)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(4, 83, 57, 0.7)")
                      }
                    >
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/Signin"
                      className="nav-link px-3 py-2 rounded mx-1"
                      onClick={() => isMobile && setIsOpen(false)}
                      style={{
                        transition: "all 0.3s ease",
                        color: "#f8f9fa",
                        backgroundColor: "rgba(108, 117, 125, 0.7)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(3, 77, 64, 0.9)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(166, 238, 238, 0.7)")
                      }
                    >
                      Sign in
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <span className="nav-link text-light px-3 py-2">
                      Welcome, {user[1] || "User"}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn px-3 py-2 rounded mx-1"
                      onClick={handleLogout}
                      style={{
                        transition: "all 0.3s ease",
                        color: "#f8f9fa",
                        backgroundColor: "rgba(220, 53, 69, 0.7)",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(220, 53, 69, 0.9)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(220, 53, 69, 0.7)")
                      }
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
