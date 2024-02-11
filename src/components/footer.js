import React from 'react';
import './FooterStyles.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer content goes here */}
        <p>&copy; {new Date().getFullYear()} SkinAI</p>
        <nav classname="nav">
          <ul>
            <li><a href="/">About</a></li>
            <li><a href="/">Team</a></li>
            <li><a href="/">Contact</a></li>
            <li><a href="/">Feedback</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
