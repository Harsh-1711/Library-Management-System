import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faUsers,
  faClock,
  faGraduationCap,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import "../assets/css/abt.css";
import "../assets/css/home.css";

const About = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const statsData = [
    { icon: faBook, count: "50,000+", label: "Books" },
    { icon: faUsers, count: "10,000+", label: "Members" },
    { icon: faClock, count: "24/7", label: "Access" },
    { icon: faGraduationCap, count: "100+", label: "Study Rooms" },
  ];

  return (
    <div className="about-page">
      {/* Header Section */}
      <section id="header" style={{ backgroundColor: "white" }}>
        <Link className="logo" to="/">
          <FontAwesomeIcon icon={faBook} />
          <span>LMS</span>
        </Link>
        <div>
          <ul id="navbar">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link className="active" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
            <li
              onMouseEnter={toggleUserDropdown}
              onMouseLeave={() => setShowUserDropdown(false)}
              style={{ position: "relative" }}
            >
              <FontAwesomeIcon icon={faUser} style={{ color: "black" }} />
              {showUserDropdown && (
                <div className="user-dropdown">
                  {/* <Link to="/signin">Sign In</Link>
                  <div className="account">Account</div>
                  <Link to="/my-account">Favourites</Link>
                  <Link to="/orders">Sign Out</Link> */}
                </div>
              )}
            </li>
          </ul>
        </div>
      </section>

      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        <div className="hero-content">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1>About Our Library</h1>
            <p>
              Empowering minds through knowledge, innovation, and community
              engagement since 1995.
            </p>
            <button className="explore-btn">Explore More</button>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="stats-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="stats-container">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="stat-card"
            >
              <FontAwesomeIcon icon={stat.icon} className="stat-icon" />
              <h3>{stat.count}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="vision-mission-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tab-content">
          <motion.h2
            className="mission-title"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our Mission
          </motion.h2>

          <motion.p
            className="mission-description"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            We strive to be the leading resource for intellectual discovery,
            providing innovative services and technology, exceptional
            collections, and spaces for engaging and transforming lives through
            knowledge.
          </motion.p>

          {/* Animated Headline */}
          <motion.h3
            className="news-headline"
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Discover. Engage. Transform.
          </motion.h3>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="timeline-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="timeline">
          {[
            {
              title: "Modern Facilities",
              description:
                "State-of-the-art study rooms, computer labs, and multimedia resources.",
            },
            {
              title: "Expert Staff",
              description:
                "Dedicated librarians and staff members ready to assist you with research and resources.",
            },
            {
              title: "Digital Access",
              description:
                "24/7 access to our extensive collection of e-books, journals, and online databases.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="timeline-item"
            >
              <div className="timeline-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join Our Community Today
        </motion.h2>
        <motion.button
          className="cta-button"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Become a Member
        </motion.button>
      </motion.section>

      {/* Footer */}
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
            {/* <h4>Follow Us</h4>
            <div className="icon">
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
          <img src="/src/assets/img/pay.png" alt="Payment Methods" />
        </div>
      </footer>
    </div>
  );
};

export default About;
``;
