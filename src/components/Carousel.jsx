import React, { useEffect } from "react";
import "./carousel.css";
import { useNavigate } from "react-router-dom";
import delivery from "../assets/images/delivery.jpg";
import man from "../assets/images/output.jpg";
import hood from "../assets/images/output (1).jpg";
import service from "../assets/images/service.jpg";

const Carousel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the carousel when component mounts
    const myCarousel = document.getElementById("mycarousel");
    if (myCarousel) {
      const carousel = new window.bootstrap.Carousel(myCarousel, {
        interval: 5000, // Rotate every 5 seconds
        ride: "carousel",
        pause: "hover", // Pause on hover
        wrap: true, // Continue looping
      });

      // Start the carousel automatically
      carousel.cycle();
    }

    // Clean up when component unmounts
    return () => {
      if (myCarousel) {
        const carousel = window.bootstrap.Carousel.getInstance(myCarousel);
        if (carousel) {
          carousel.dispose();
        }
      }
    };
  }, []);

  return (
    <section className="row">
      <div className="col-md-12">
        <div id="mycarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={delivery} alt="delivery" className="d-block w-100" />
              <div className="carousel-caption splash-text">
                <h1 className="display-5 fw-bold splash-heading">
                  Welcome to Click-Crew
                </h1>
                <p className="lead">Get Delivered Products To Your DoorStep.</p>
                <button
                  onClick={() => navigate("/Products")}
                  className="btn btn-success mt-2 w-100"
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={man}
                alt="Delivery"
                className="d-block w-100"
                height="450"
              />
              <div className="carousel-caption splash-text">
                <h1 className="display-5 fw-bold splash-heading">
                  Welcome to Click-Crew
                </h1>
                <p className="lead">
                  Get Products That You'll Need For Summer.
                </p>
                <button
                  onClick={() => navigate("/Products")}
                  className="btn btn-success mt-2 w-100"
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={hood}
                alt="Basketball Jersey"
                className="d-block w-100"
                height="450"
              />
              <div className="carousel-caption splash-text">
                <h1 className="display-5 fw-bold splash-heading">
                  Welcome to Click-Crew
                </h1>
                <p className="lead">
                  Get New Arrivals Updates Once You've Signed Up
                </p>
                <button
                  onClick={() => navigate("/Products")}
                  className="btn btn-success mt-2 w-100"
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={service}
                alt="Services"
                className="d-block w-100"
                height="450"
              />
              <div className="carousel-caption splash-text">
                <h1 className="display-5 fw-bold splash-heading">
                  Welcome to Click-Crew
                </h1>
                <p className="lead">Services Offered to Every User</p>
                <button
                  onClick={() => navigate("/Products")}
                  className="btn btn-success mt-2 w-100"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#mycarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon btn btn-success"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#mycarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon btn btn-success"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>

          {/* Indicators */}
          <div className="carousel-indicators">
  <button
    type="button"
    data-bs-target="#mycarousel"
    data-bs-slide-to="0"
    className="active"
    aria-current="true"
    aria-label="Slide 1"
  ></button>
  <button
    type="button"
    data-bs-target="#mycarousel"
    data-bs-slide-to="1"
    aria-label="Slide 2"
  ></button>
  <button
    type="button"
    data-bs-target="#mycarousel"
    data-bs-slide-to="2"
    aria-label="Slide 3"
  ></button>
  <button
    type="button"
    data-bs-target="#mycarousel"
    data-bs-slide-to="3"
    aria-label="Slide 4"
  ></button>
</div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
