import React from "react";
import "./carousel.css";
import { useNavigate } from "react-router-dom";
import delivery from "../assets/images/delivery.jpg";
import man from "../assets/images/output.jpg";
import hood from "../assets/images/output (1).jpg";
import service from "../assets/images/service.jpg";

const Carousel = () => {
  const navigate = useNavigate();

  return (
    <section className="row">
      <div className="col-md-12">
        <div
          id="mycarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
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
                alt="Delivey"
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
                <p className="lead">Get New Arrivals Updates Once You've Signed Up</p>

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
                alt="Football Jersey"
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

          <a
            href="#mycarousel"
            className="carousel-control-prev"
            role="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </a>
          <a
            href="#mycarousel"
            className="carousel-control-next"
            role="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </a>

          <ol className="carousel-indicators">
            <li
              data-bs-target="#mycarousel"
              data-bs-slide-to="0"
              className="active"
            ></li>
            <li data-bs-target="#mycarousel" data-bs-slide-to="1"></li>
            <li data-bs-target="#mycarousel" data-bs-slide-to="2"></li>
            <li data-bs-target="#mycarousel" data-bs-slide-to="3"></li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
