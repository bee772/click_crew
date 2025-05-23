import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import sonyImage from "../assets/images/sony.jpg";
import watch from "../assets/images/watch.jpg";
import earbuds from "../assets/images/earbuds.jpg";
import delivery from "../assets/images/deli.avif";
import mobile from "../assets/images/mob.webp";
import hood from "../assets/images/hood.jpg";
import service from "../assets/images/service.jpg";
import about from "../assets/images/about.jpg";
import fb from "../assets/images/fb.jpeg";
import x from "../assets/images/x.jpg";
import IG from "../assets/images/ig.jpg";
import Linkedin from "../assets/images/link.jpg";
import Youtube from "../assets/images/tube.png";

const Home = () => {
  const [comments, setComments] = useState([
    {
      text: "The Sony headphones exceeded all my expectations! The noise cancellation is incredible.",
      author: "Sarah J.",
    },
    {
      text: "Fast delivery and excellent customer service. Will definitely shop here again!",
      author: "Michael T.",
    },
    {
      text: "I've been using the smartwatch for a month now and it's completely changed my fitness routine.",
      author: "David K.",
    },
    {
      text: "The wireless earbuds have amazing sound quality and battery life. Highly recommend!",
      author: "Emily R.",
    },
    {
      text: "Click-Crew has the best deals I've found online. Saved over KSH 2000 on my last purchase.",
      author: "James L.",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const productCarouselRef = useRef(null);
  const testimonialCarouselRef = useRef(null);

  useEffect(() => {
    const productCarousel = new window.bootstrap.Carousel(
      productCarouselRef.current,
      { interval: 3000 }
    );
    const testimonialCarousel = new window.bootstrap.Carousel(
      testimonialCarouselRef.current,
      { interval: 4000 }
    );
    return () => {
      productCarousel.dispose();
      testimonialCarousel.dispose();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        { text: newComment.trim(), author: "You" },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="homepage-container">
      <header className="text-center py-4">
        <h1 className="text-success display-4 fw-bold">CLICK-CREW</h1>
        <p className="lead">Best Deals on Products You Love!</p>
        <p>Sell products that you've got once you've registered</p>
      </header>

      <section className="carousel-section mb-5">
        <div
          id="productCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          ref={productCarouselRef}
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
          </div>
          <div className="carousel-inner rounded-3 shadow-lg">
            <div className="carousel-item active">
              <div className="carousel-image-container">
                <img
                  src={delivery}
                  className="d-block w-100"
                  alt="Fast Delivery"
                />
              </div>
              <div className="carousel-caption">
                <h3 className="bg-success p-2 rounded">Fast Delivery</h3>
                <p className="text-white bg-dark bg-opacity-75 p-1 rounded">
                  Get Delivered In No Time
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carousel-image-container">
                <img
                  src={mobile}
                  className="d-block w-100"
                  alt="Mobile Phones"
                />
              </div>
              <div className="carousel-caption">
                <h3 className="bg-success p-2 rounded">Summer Sale</h3>
                <p className="text-white bg-dark bg-opacity-75 p-1 rounded">
                  Up to 50% off on selected items
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={hood}
                className="d-block w-100"
                alt="New Arrivals"
                style={{ height: "500px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="bg-success p-2 rounded">New Arrivals</h3>
                <p className="text-white bg-dark bg-opacity-75 p-1 rounded">
                  Be the first to get the hottest products of the season
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={service}
                className="d-block w-100"
                alt="Customer Service"
                style={{ height: "500px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="bg-success p-2 rounded">Customer Service</h3>
                <p className="text-white bg-dark bg-opacity-75 p-1 rounded">
                  Top-rated products loved by our community
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-dark bg-opacity-50 rounded p-3"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-dark bg-opacity-50 rounded p-3"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section className="about-section container mb-5">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <img
              src={about}
              alt="About Click-Crew"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2 className="text-success mb-3">About Click-Crew</h2>
            <p className="lead">
              Your premier affiliate marketing platform for the best deals and
              honest reviews.
            </p>
            <p>
              We partner with top brands to offer quality products at
              competitive prices. Our team thoroughly tests each product to
              ensure they meet our high standards.
            </p>
            <p>
              Join our community of savvy shoppers and make informed purchasing
              decisions!
            </p>
          </div>
        </div>
      </section>

      <section className="featured-products container mb-5">
        <h2 className="text-success text-center mb-4">Featured Products</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <img
                src={sonyImage}
                className="card-img-top"
                alt="Sony Headphones"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="card-title">Sony Headphones</h3>
                <p className="card-text">
                  Industry-leading noise cancellation with 30-hour battery life.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <img
                src={watch}
                className="card-img-top"
                alt="Smart Watch Pro"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="card-title">Smart Watch Pro</h3>
                <p className="card-text">
                  Fitness tracking with SpO2 monitoring and GPS.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <img
                src={earbuds}
                className="card-img-top"
                alt="Wireless Earbuds"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="card-title">Wireless Earbuds</h3>
                <p className="card-text">
                  True wireless with active noise cancellation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials container mb-5">
        <h2 className="text-success text-center mb-4">Customer Testimonials</h2>
        <div
          className="carousel slide"
          id="testimonialCarousel"
          data-bs-ride="carousel"
          ref={testimonialCarouselRef}
        >
          <div className="carousel-inner">
            {comments.slice(-5).map((comment, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <div className="d-flex justify-content-center">
                  <div className="card shadow p-4 w-75 text-center">
                    <p className="fs-5">"{comment.text}"</p>
                    <p className="text-muted fw-bold">- {comment.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-lg-6">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-success text-center mb-4">
                  Leave Us a Comment
                </h3>
                <form onSubmit={handleSubmit}>
                  <textarea
                    className="form-control mb-3"
                    rows="4"
                    placeholder="Share your experience with us..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                  <div className="text-center">
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-success text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <h4>Newsletter</h4>
              <form>
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Your email address"
                />
                <button type="submit" className="btn btn-outline-light">
                  Subscribe
                </button>
              </form>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column align-items-start">
                {" "}
                {/* Changed to align items to start (left) */}
                <h4>Connect With Us</h4>
                <div className="d-flex gap-3 mb-3">
                  {" "}
                  {/* Social icons container */}
                  <img
                    src={fb}
                    alt="Facebook"
                    className="rounded"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <img
                    src={IG}
                    alt="Instagram"
                    className="rounded"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <img
                    src={x}
                    alt="Twitter"
                    className="rounded"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <img
                    src={Linkedin}
                    alt="LinkedIn"
                    className="rounded"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <img
                    src={Youtube}
                    alt="YouTube"
                    className="rounded"
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
                <div className="contact-info text-start">
                  {" "}
                  {/* Added text-start for alignment */}
                  <p>
                    <i className="bi bi-envelope me-2"></i> info@click-crew.com
                  </p>
                  <p>
                    <i className="bi bi-phone me-2"></i> +254712345678
                  </p>
                  <p>
                    <i className="bi bi-geo-alt me-2"></i> Purshottam Place,
                    Nairobi
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4 pt-3 border-top">
            <p>&copy; 2025 CLICK-CREW. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
