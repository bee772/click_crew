import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait...");
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post(
        "https://Mwangi10.pythonanywhere.com/api/signin",
        data
      );

      setLoading("");

      if (response.data.user) {
        setSuccess(response.data.Message);

        // Save user and token
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        // ✅ Reload the app to reflect login in Navbar
        window.location.href = "/";
      } else {
        setError(response.data.Message || "Login Failed");
      }
    } catch (err) {
      setLoading("");
      setError(err.response?.data?.Message || "Something went wrong!!");
    }
  };

  return (
    <div className="card">
      <div className="card2">
        <form className="form" onSubmit={submit}>
          <p id="heading">Login</p>

          <div className="field">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className="input-icon"
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className="input-icon"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="btn">
            <button className="button1" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <Link to="/Signup" className="button2">
              Sign Up
            </Link>
          </div>

          <div className="messages">
            {loading && <p className="loading">{loading}</p>}
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
