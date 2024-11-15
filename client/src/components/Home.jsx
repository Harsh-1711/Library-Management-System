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
import toast from "react-hot-toast";

const Home = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [avatar, setAvatar] = useState("");
  let file;
  const navigate = useNavigate();
  const defaultAvatar =
    "https://res.cloudinary.com/minor-project/image/upload/v1731654563/Minor%20Project/pcgphikpnjuwdtnephds.png";

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleAvatarUpload = (e) => {
    file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatar(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      toast.error("Invalid file type", " Please select an image file", "error");
      setAvatar(null);
    }
  };

  const openPopup = () => {
    setShowPopup(true);
    setShowUserDropdown(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleUpdate = async () => {
    // console.log("User: ", avatar);
    const res = await axios.post(
      "/api/users/updateProfile",
      {
        name: userName,
        password,
        img: avatar || defaultAvatar,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Updated User: ", res.data);
    if (res.data.user) {
      setUserName(res.data.user.name);
      setAvatar(res.data.user.avatar || defaultAvatar);
    }

    closePopup();
    setTimeout(() => {
      toast.success(res.data.message);
    }, 2000);
    // window.location.reload();
  };
  const [firstName, setFirstName] = useState("");

  const images = ["/src/assets/img/slider2.jpg", "/src/assets/img/slider3.jpg"];

  useEffect(() => {
    const handleAuthorization = () => {
      axios
        .get("/api/auth", { withCredentials: true })
        .then((res) => {
          const user = res.data.user;
          setUserName(user.name.split(" ")[0]);
          console.log("User Avatar: ", user);
          setAvatar(user.avatar || defaultAvatar);
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

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };
  const handleLogout = async () => {
    try {
      await axios.get("/api/logout", { withCredentials: true });
      toast.success("Logged out successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Error during logout: " + error.message);
    }
  };

  return (
    <div className="home">
      <section id="header" style={{ backgroundColor: "white" }}>
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

            <li
              onMouseEnter={toggleUserDropdown}
              onMouseLeave={() => setShowUserDropdown(false)}
            >
              <div style={{ textAlign: "center", marginTop: "0" }}>
                {avatar && (
                  <img
                    src={avatar || defaultAvatar}
                    alt="Avatar"
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      marginTop: "-20px",
                      marginRight: "10px",
                    }}
                  />
                )}
              </div>
              <p style={{ color: "black", fontSize: "1.1rem", marginTop: "0" }}>
                Hi, {userName}
              </p>
              {showUserDropdown && (
                <div className="user-dropdown">
                  {!userName && <Link to="/login">Sign In</Link>}{" "}
                  <div onClick={openPopup} className="account">
                    Account
                  </div>{" "}
                  <Link to="#">Favourites</Link>
                  <Link to="#" onClick={handleLogout}>
                    Sign Out
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </section>

      {/* Popup Form for Profile Update */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Update Profile</h3>
            <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
              {avatar ? (
                <img
                  src={avatar || defaultAvatar}
                  alt="Avatar"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              ) : (
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: "1px dashed #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span>Avatar</span>
                </div>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              id="avatar-upload"
              style={{ display: "none" }}
            />
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={handleNameChange}
            />
            <input
              type="password"
              placeholder="Enter new password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={closePopup} style={{ marginRight: "5px" }}>
                Close
              </button>
              <button onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Offer Section with Slider */}
      <div className="offer-container">
        <img
          className="offer-slider"
          src={images[currentSlide]}
          alt="Offer Slide"
        />
        <div className="text-content">
          <h1>Welcome to Our Library:)</h1>
          <h2>Exclusive Reading Experiences</h2>
          {/* <h2>For Book Lovers & Scholars</h2> */}

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
                    const heartIcon = e.currentTarget;
                    heartIcon.classList.toggle("active");

                    if (heartIcon.classList.contains("active")) {
                      alert(`${product.title} has been added to favourites!`);
                    } else {
                      alert(
                        `${product.title} has been removed from favourites!`
                      );
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </Link>
              </div>
              <div className="des">
                {/* Bold the title using inline styling */}
                <h5
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#171b19",
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  {product.title}
                </h5>
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
                    const heartIcon = e.currentTarget;
                    heartIcon.classList.toggle("active");

                    if (heartIcon.classList.contains("active")) {
                      alert(`${product.title} has been added to favourites!`);
                    } else {
                      alert(
                        `${product.title} has been removed from favourites!`
                      );
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </Link>
              </div>
              <div className="des">
                {/* Bold the title using inline styling */}
                <h5
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#171b19",
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  {product.title}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* <NewArivals/> */}

      {/* Newsletter Section */}
      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
          <h4>Subscribe to Our Newsletter</h4>
          <p className="p">
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
          <p className="p">
            <strong>Address:</strong> 562 Wellington Road, Street 32, India
          </p>
          <p className="p">
            <strong>Phone:</strong> +78098643245 / +8976543654
          </p>
          <p className="p">
            <strong>Hours:</strong> 10:00-10:00, Mon-Sat
          </p>
          <div className="follow">
            {/* <h4>Follow Us</h4> */}
            {/* <div className="icon">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaPinterestP />
              <FaYoutube />
            </div> */}
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
          {/* <a href="#">My Wishlist</a> */}
          {/* <a href="#">Track My Order</a> */}
          <a href="#">Help</a>
        </div>
        <div className="col install">
          <h4>Install App</h4>
          <p className="p">From App Store or Google Play</p>
          <div className="row">
            <img src="/src/assets/img/app.jpg" alt="App Store" />
            <img src="/src/assets/img/play.jpg" alt="Google Play" />
          </div>
          <p className="p">Secured Payment Gateways</p>
          <img src="/src/assets/img/pay.png" alt="Payment Gateways" />
        </div>
      </footer>
    </div>
  );
};

export default Home;
