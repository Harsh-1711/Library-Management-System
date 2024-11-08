import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../assets/css/contact.css";
import { faMapMarkerAlt, faEnvelope, faPhone, faUser, faBook } from '@fortawesome/free-solid-svg-icons';

import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [focus, setFocus] = useState({ name: false, email: false, phone: false, message: false });
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleFocus = (field) => {
    setFocus({ ...focus, [field]: true });
  };

  const handleBlur = (field, value) => {
    if (value === '') {
      setFocus({ ...focus, [field]: false });
    }
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <div className="container">
      {/* Navbar in Header */}
      <section id="header" style={{ backgroundColor: 'lightgrey', padding: '10px 0' }}>
        <Link className="logo" to="/">
          <FontAwesomeIcon icon={faBook} />
          <span>LMS</span>
        </Link>
        <ul id="navbar">
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/abt">About</Link></li>
          <li><Link className="active" to="/Contact">Contact</Link></li>
          <li
            onMouseEnter={toggleUserDropdown}
            onMouseLeave={() => setShowUserDropdown(false)}
            style={{ position: 'relative' }}
          >
            <FontAwesomeIcon icon={faUser} style={{ color: 'black' }} />
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
      </section>

      {/* Rest of the Contact Component */}
      <span className="big-circle"></span>
      <img src="img/shape.png" className="square" alt="" />
      <div className="form">
        <div className="contact-info">
          <h3 className="title flicker">Let's get in touch</h3>
          <p className="text">
            For inquiries related to our library services, book availability, or any other questions, feel free to reach out to us.
          </p>

          <div className="info">
            <div className="information">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> &nbsp;&nbsp;
              <p>92 Cherry Drive Uniondale, NY 11553</p>
            </div>
            <div className="information">
              <FontAwesomeIcon icon={faEnvelope} /> &nbsp;&nbsp;
              <p>lorem@ipsum.com</p>
            </div>
            <div className="information">
              <FontAwesomeIcon icon={faPhone} /> &nbsp;&nbsp;
              <p>123-456-789</p>
            </div>
          </div>

          <div className="social-media">
            <p>Connect with us:</p>
            <div className="social-icons">
              <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          {/* <span className="circle one"></span> */}
          {/* <span className="circle two"></span> */}

          <form action="index.html" autoComplete="off">
            <h3 className="title">Contact us</h3>
            {['name', 'email', 'phone'].map((field) => (
              <div className="input-container" key={field}>
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  className="input"
                  onFocus={() => handleFocus(field)}
                  onBlur={(e) => handleBlur(field, e.target.value)}
                />
                <label htmlFor="">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
              </div>
            ))}
            <div className="input-container textarea">
              <textarea
                name="message"
                className="input"
                onFocus={() => handleFocus('message')}
                onBlur={(e) => handleBlur('message', e.target.value)}
              ></textarea>
              <label htmlFor=""></label>
              <span></span>
            </div>
            <input type="submit" value="Send" className="btn flicker" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
