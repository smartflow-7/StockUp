import React from "react";
import "./CSS/Section4.css";
import sl10 from '../Components/Assets/sl10.png';
import sl12 from '../Components/Assets/sl12.png';


const Section4 = () => {
  return (
    <>
    <div className="section4-container">
      <h2 className="section4-title">
        Simulate the Markets. Master the Moves.
      </h2>
      <p className="section4-subtitle">
        Simulate real-world trading across multiple markets with zero risk.
        The practice mode mirrors real price movements, exchange rates, and portfolio behavior so users can build real confidence without using real money.
      </p>

      <div className="section4-tabs">
        <span className="tab active">Crypto</span>
        <span className="tab">US Stocks</span>
        <span className="tab">African Markets</span>
      </div>

      <div className="section4-content">
        <div className="section4-left">
          <div className="section4-text">
            <p>
              Practice trading top digital assets like Bitcoin, Ethereum, and Solana
              in a simulated environment. Learn how wallets work, what makes coins
              move, and how to avoid scams with fake tokens. Prices update in
              real-time, with Naira equivalents for every asset.
            </p>
            <button className="learn-more-btn">Learn More</button>
          </div>
        </div>

        <div className="section4-right">
          <div className="mockup-wrapper">
            <img src={sl10} alt="Market simulation" />
          </div>
        </div>
      </div>
    </div>

     <div className="section4-container">
      <h2 className="section4-title">
        From Side Gig to Smart Gains: The Naija-Tailored Money Path
      </h2>
      <p className="section4-subtitle">
        Simulate real-world trading across multiple markets with zero risk.
        The practice mode mirrors real price movements, exchange rates, and portfolio behavior so users can build real confidence without using real money.
      </p>

<div className="mic">
      <div className="section4-tabs">
        <span className="tab active">Step 1</span>
        <span className="tab1">Step 2</span>
        <span className="tab1">Step 3</span>
        <span className="tab1">Step 4</span>
        <span className="tab1">Step 5</span>

      </div>

      <div className="section4-content">

        <div className="section4-left">
          <div className="mockup-wrapper1">
            <img src={sl12} alt="Market simulation" />
          </div>
        </div>
        <div className="section4-right1">
          <div className="section4-text1">
          <h2 className="t1">Naira Basics First</h2>
            <h2 className="t2">
              Understand how inflation, currency devaluation, and exchange rates impact your finances and global buying power.
            </h2>
            <button className="learn-more-btn1">Get Started</button>
          </div>
        </div>
      </div>
      </div>

      <div className="mic1">
      <div className="cont">
        <h2>Trade like a pro-without losing a kobo. Try StockUp today</h2>
        <button className="learn-more-btn2">Try Stockup Free</button>
</div>
      </div>
    </div>
    </>
  );
};

export default Section4;
