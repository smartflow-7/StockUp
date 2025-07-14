import React from 'react';
import './CSS/Landing.css';
import ec20 from '../Components/Assets/ec20.png';
import ec27 from '../Components/Assets/ec27.png';
import ec28 from '../Components/Assets/ec28.png';
import ec29 from '../Components/Assets/ec29.png';
import ec32 from '../Components/Assets/ec32.png';
import sup from '../Components/Assets/sup.png';
import chart from '../Components/Assets/chart.PNG';
import { FiArrowLeft, FiInfo, FiImage, FiSliders } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="landing-container">
      {/* LEFT SIDE */}
      <div className="landing-left">
        <div className="navbar">
          <div className="logo-img-text">
            <img src={sup} alt="logo" className="sup-logo" />
            <span className="logo-text">
              <span className="logo-stock">stock</span>
              <span className="logo-up">up</span>
            </span>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#pricing">Pricing</a>
            <a href="#resources">Resources</a>
          </div>
        </div>

        <h1>
          Master the market <br />
          without the pressure — <br />
          <span className="highlight-black">risk free trading</span> <br />
          with StockUp
        </h1>

        <p className="description">
          StockUp gives you a safe, interactive environment to build trading confidence.
          Use virtual funds, test strategies, and learn how the markets work — without spending a kobo.
        </p>

        <div className="cta-buttons">
          <button className="btn primary">Start Trading Risk Free</button>
          <button className="btn secondary">Watch demo</button>
        </div>

        <div className="users-box">
          <div className="users-left">
            <p className="user-count">32,000</p>
            <p className="user-text">Traders using us to learn</p>
          </div>
          <div className="avatars">
            <img src={ec32} alt="avatar1" />
            <img src={ec28} alt="avatar3" />
            <img src={ec27} alt="avatar4" />
            <img src={ec20} alt="avatar5" />
            <div className="extra">+8</div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="landing-right">
        <div className="top-right-container">
          <button className="get-started-btn">Get started</button>
        </div>

        <div className="mobile-card">
          <div className="card-top-header">
            <div className="left-info">
              <div className="back-arrow"><FiArrowLeft /></div>
              <div className="stock-names">
                <div className="dngte">DNGTE</div>
                <div className="dangote">Dangote</div>
              </div>
            </div>
            <div className="right-icons">
              <div className="three-circles">
                <FaCircle size={6} />
                <FaCircle size={8} />
                <FaCircle size={5} />
              </div>
              <div className="dots-icon">
                <BsThreeDotsVertical />
              </div>
            </div>
          </div>

          <div className="price-section">
            <div className="price-left">
              <h3>$324.56</h3>
              <p className="green">
                + $18.6 (4.32%) <FiInfo className="info-icon" />
              </p>
              <p className="price-timestamp">Price at close 6, Jun, 00:00, +4</p>
            </div>
            <div className="price-right">
              <p className="market-title">Nasdaq</p>
              <p className="market-sub">Market closed</p>
              <p className="market-sub">Opens at 6, Jun 15:35</p>
            </div>
          </div>

          <div className="chart-section">
            <img src={chart} alt="charts" />
          </div>

          <div className="timeframe-buttons">
            <button>1D</button>
            <button>1W</button>
            <button>1M</button>
            <button>6M</button>
            <button>1Y</button>
            <div className="round-icon"><FiImage /></div>
            <div className="round-icon"><FiSliders /></div>
          </div>

          <div className="overview-header">
            <strong>Overview</strong>
            <FiInfo className="info-icon" />
          </div>

          <div className="overview-table">
  <div className="label">Open</div>
  <div className="value">317.27</div>
  <div className="label">Volume</div>
  <div className="value">529.42</div>

  <div className="label">Low</div>
  <div className="value">316.12</div>
  <div className="label">Avg No</div>
  <div className="value">480.73</div>

  <div className="label">High</div>
  <div className="value">324.56</div>
  <div className="label">Market</div>
  <div className="value">712.03</div>

   <div className="label">P/E</div>
  <div className="value">324.56</div>
  <div className="label">Ask</div>
  <div className="value">712.03</div>
</div>

        </div>
      </div>
    </div>
  );
};

export default Landing;
