import React from 'react';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About EventPro</h4>
          <p>
            EventPro is your trusted partner for planning and managing events seamlessly. 
            From bookings to coordination, we simplify it all for you.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@eventpro.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Location: 123 Event Street, Cityville</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EventPro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
