import React from 'react';
import './CSS/Footer.css';
import sup from '../Components/Assets/sup.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
       <div className="logo-img-text">
                  <img src={sup} alt="logo" className="footer-logo" />
                  <span className="logo-text">
                    <span className="logo-stock">stock</span>
                    <span className="logo-up">up</span>
                  </span>
                </div>
      </div>

      <div className="footer-center">
        ©2025 StockUp TM. All Rights Reserved
      </div>

      <div className="footer-right">
        <span className="footer-link">Terms of Use</span>
        <span className="footer-link">Privacy Policy</span>
      </div>
    </footer>
  );
};

export default Footer;
