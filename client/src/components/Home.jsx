import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../assets/css/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faHeart, faStore } from "@fortawesome/free-solid-svg-icons";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [showSellerDropdown, setShowSellerDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const images = [
    "/src/assets/img/slider2.jpg",
    "/src/assets/img/slider3.jpg",
    // '/img/slider4.jpg'
  ];
  useEffect(() => {
    const handleAuthorization = () => {
      console.log("Function calling");
      axios
        .get("/api/auth", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          navigate("/login");
          console.log(err);
        });
    };
    handleAuthorization();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const toggleSellerDropdown = () => {
    setShowSellerDropdown(true);
    setShowUserDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown); // Toggle dropdown visibility
    setShowSellerDropdown(false);
  };

  return (
    <div>
      <section id="header">
        <Link className="logo">
          <FontAwesomeIcon icon={faBook} />

          <span>LMS</span>
        </Link>
        <div>
          <ul id="navbar">
            <li>
              <Link className="active" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
            <li>
              <Link to="/Cart">
                <FontAwesomeIcon icon={faStore} />
                <span style={{ marginLeft: "5px" }}></span>
              </Link>
            </li>
            <li
              onMouseEnter={toggleUserDropdown}
              onMouseLeave={() => setShowUserDropdown(false)}
            >
              <FontAwesomeIcon icon={faUser} />
              {showUserDropdown && (
                <div className="user-dropdown">
                  <Link to="/signin">Sign In</Link>
                  <Link to="/register">Account</Link>
                  <Link to="/my-account">Favourites</Link>
                  <Link to="/orders">Sign Out</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </section>

      {/* Offer Section with Slider */}
      <div className="offer-container">
        <img
          className="offer-slider"
          src={images[currentSlide]}
          alt="Offer Slide"
        />
        <div className="text-content">
          <h1>Welcome to Our Library</h1>
          <h2>Exclusive Reading Experiences</h2>
          {/* <h2>For Book Lovers & Scholars</h2> */}
          <p>
            Get access to thousands of books and resources. <br></br>
            Special membership discounts available!
          </p>
          <button>Join Now</button>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="feature-cards">
        {[
          { src: "/src/assets/img/1F.png", title: "Borrow Books" },
          { src: "/src/assets/img/4.png", title: "Online Catalog" },
          { src: "/src/assets/img/6L.png", title: "Study Rooms" },
          { src: "/src/assets/img/4.png", title: "Reading Sessions" },
          { src: "/src/assets/img/6.jpg", title: "24/7 Support" },
        ].map((card, index) => (
          <div className="card" key={index}>
            <img src={card.src} alt={card.title} />
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#171b19",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {card.title}
            </p>
          </div>
        ))}
      </div>

      {/* Featured Products Section */}
      <section id="product1" className="section-p1">
        <h2>Featured Books</h2>
        <div className="pro-container">
          {[
            { src: "/src/assets/img/f1.jpg", title: "WAR" },
            { src: "/src/assets/img/f2.jpg", title: "FICTION" },
            { src: "/src/assets/img/f3.jpg", title: "REVENGE TRAGEDY" },
            { src: "/src/assets/img/f5.jpg", title: "LOVE" },
            { src: "/src/assets/img/f4.jpg", title: "MYTHOLOGY" },
            { src: "/src/assets/img/f6.jpg", title: "FICTION" },
            { src: "/src/assets/img/f7.jpg", title: "ADVENTURE" },
            { src: "/src/assets/img/f8.jpg", title: "FICTION" },
          ].map((product, index) => (
            <div className="pro" key={index}>
              <div className="img-container">
                <img src={product.src} alt={product.title} />
                <Link
                  to="/"
                  className="heart-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.toggle("active");
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </Link>
              </div>
              <div className="des">
                <h5>{product.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section id="product1" className="section-p1">
        <h2>New Arrivals</h2>
        <div className="pro-container">
          {[
            { src: "/src/assets/img/a1.jpg", title: "MYSTERY" },
            { src: "/src/assets/img/a2.jpg", title: "FICTION" },
            { src: "/src/assets/img/a3.jpg", title: "MAGICAL REALISM" },
            { src: "/src/assets/img/a4.jpg", title: "HISTORICAL ROMANCE" },
            { src: "/src/assets/img/a5.jpg", title: "FICTION" },
            { src: "/src/assets/img/f4.jpg", title: "MYTHOLOGY" },
            { src: "/src/assets/img/f1.jpg", title: "WAR" },
            { src: "/src/assets/img/f2.jpg", title: "FICTION" },
          ].map((product, index) => (
            <div className="pro" key={index}>
              <div className="img-container">
                <img src={product.src} alt={product.title} />
                <Link
                  to="/"
                  className="heart-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.toggle("active");
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                  {/* <i className="fas fa-heart"></i> */}
                </Link>
              </div>
              <div className="des">
                <h5>{product.title}</h5>
                <h4>{product.price}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
          <h4>Subscribe to Our Newsletter</h4>
          <p>
            Stay updated with the latest book releases, events, and{" "}
            <span>exclusive offers</span> from our library!
          </p>
        </div>
        <div className="form">
          <input type="text" placeholder="Your email address" />
          <button className="normal">Sign Up</button>
        </div>
      </section>

      <footer className="section-p1">
        <div className="col">
          <h4>Contact</h4>
          <p>
            <strong>Address:</strong> 562 Wellington Road, Street 32, India
          </p>
          <p>
            <strong>Phone:</strong> +78098643245 / +8976543654
          </p>
          <p>
            <strong>Hours:</strong> 10:00-10:00, Mon-Sat
          </p>
          <div className="follow">
            <h4>Follow Us</h4>
            <div className="icon">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaPinterestP />
              <FaYoutube />
            </div>
          </div>
        </div>
        <div className="col">
          <h4>About</h4>
          <a href="#">About Us</a>
          <a href="#">Library Services</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms and Conditions</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="col">
          <h4>My Account</h4>
          <a href="#">Sign In</a>
          <a href="#">View Borrowed Books</a>
          <a href="#">My Wishlist</a>
          <a href="#">Track My Order</a>
          <a href="#">Help</a>
        </div>
        <div className="col install">
          <h4>Install App</h4>
          <p>From App Store or Google Play</p>
          <div className="row">
            <img src="/src/assets/img/app.jpg" alt="App Store" />
            <img src="/src/assets/img/play.jpg" alt="Google Play" />
          </div>
          <p>Secured Payment Gateways</p>
          <img src="/src/assets/img/pay.png" alt="Payment Gateways" />
        </div>
      </footer>
    </div>
  );
};

export default Home;
