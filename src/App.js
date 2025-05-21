import "./App.css";
import click from "../src/assets/images/click.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home";
import Products from "./components/Products";
import Payment from "./components/Payment";
import Cart from "./components/Cart";
import Upload from "./components/Upload";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [cartCount, setCartCount] = useState(0);

  // Function to update cart count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  // Listen for cart updates
  useEffect(() => {
    // Initial load
    updateCartCount();

    // Add event listener for cart updates
    window.addEventListener("cartUpdated", updateCartCount);

    // Cleanup
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar cartCount={cartCount} />

        <Routes>
          <Route path="/signup" Component={Signup}></Route>
          <Route path="/signin" Component={Signin}></Route>
          <Route path="/" Component={Home}></Route>
          <Route path="/products" Component={Products}></Route>
          <Route path="/payment" Component={Payment}></Route>
          <Route path="/cart" Component={Cart}></Route>
          <Route path="/Upload" Component={Upload}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
