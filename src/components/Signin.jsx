import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait...");

    try {
      //create form data
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post(
        "https://mwangi10.pythonanywhere.com/api/signin",
        data
      );
      setLoading("");

      if (response.data.user) {
        setSuccess(response.data.Message);

        //todo save the datails to local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        setError("Login Failed");
      }
    } catch (error) {
      setLoading("");
      setError("Something went wrong!!");
    }
  };
  return (
    <div className="row justify-content-center mt-4 signin-container ">
      <div className="col-md-6 card shadow p-4">
        <form onSubmit={submit}>
          <h2>Sign In</h2>

          {loading}
          {success}
          {error}
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="form-control mt-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-outline-success my-3 px-5">
            Sign In 
          </button>
          <p>
            Don't have an Account?
            <Link to="/Signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Signin;
