import React from 'react';
import './CSS/Section3.css';
import sl4 from '../Components/Assets/sl4.PNG';
import sl5 from '../Components/Assets/sl5.PNG';
import sl6 from '../Components/Assets/sl6.PNG';
import sl7 from '../Components/Assets/sl7.PNG';
import sl8 from '../Components/Assets/sl8.png';
import sl9 from '../Components/Assets/sl9.png';


import { FaChevronDown, FaChevronUp } from "react-icons/fa";


const Section3 = () => {
  return (
    <>
    <div className="section3-container">
      <div className="section3-content">
        <h2>Your Nigerian-Proof Trading Armor</h2>
        <p>
          In a world where fake crypto platforms multiply faster than Lagos traffic and dollar swings erase profits overnight – StockUp doesn’t just educate. We arm you with battle-tested tools forged for Nigerian realities.
        </p>
      </div>

     <div className="section3-layout">
    <div className="alerts-card">
      <div className="alert-item top-card">
        <img src={sl4} className="alert-icon" alt="avatar1" />
        <div>
          <p><strong>New folder detected</strong> • 1h</p>
          <p>Save images from 'Vacation'?</p>
        </div>
        <img src={sl7} className="alert-icon1" alt="avatar1" />
         <span className="arrow-wrapper">
      <FaChevronDown />
    </span>
      </div>

      <div className="alert-item mid-card">
        <img src={sl5} className="alert-icon" alt="avatar1" />
              <div>
          <p><strong>Check out the latest releases</strong> • 3h</p>
          <p>New music from your favorite artists</p>
        </div>
         <span className="arrow-wrapper">
      <FaChevronDown />
    </span>
      </div>

      <div className="alert-item bottom-card">
        <img src={sl6} className="alert-icon" alt="avatar1" />
        <div>
          <p><strong>Breaking News</strong> • 10 mins</p>
          <p>Dollar at an all-time low following sanctions imposed by Tesla on other random articles of news</p>
          <div className="alert-actions">
            <span>Check Now</span>
            <span>Mark as read</span>
          </div>
        </div>
         <span className="arrow-wrapper">
      <FaChevronUp />
    </span>
      </div>
    </div>
 <div className="market-highlights">
      <h3>Market Alerts That Finally Understand Nigerian Life</h3>
      <ul>
        <li><span className="highlight-red">Traffic-Timed:</span> "Bitcoin dip alert" when Third Mainland Bridge crawls</li>
        <li><span className="highlight-red">Prayer-Protected:</span> Auto-silenced during Jama’at & church hours</li>
        <li><span className="highlight-red">Data-Savvy:</span> Lightweight SMS-style updates when network wobbles</li>
      </ul>
      <p className="bottom-note">
        Our algorithm cross-checks key socio-economic triggers, religious timelines, and traffic hotspots to deliver timely alerts while optimizing data and respecting cultural contexts.
      </p>
    </div>
  </div>
</div>

<div className="section3-container">
 <div className="section3-layout">
    <div className="market-highlights">
      <h2>Trading Made Suya-Simple: Earn ₦ While You Learn</h2>
      <ul>
        <li className="highlight-blue"><span className="highlight-blue">Top-Simple UI:</span> Trade Bitcoin faster than ordering Amala</li>
        <li className="highlight-blue"><span className="highlight-blue">Naija Game Rewards:</span> Unlock 'Lagos Shark' status for spotting scams</li>
        <li className="highlight-blue"><span className="highlight-blue">Error-Friendly:</span>Srewed Up? "No Wahala" rewind button + tutorial</li>
      </ul>
      <p className="bottom-note">
        Designed for simplicity, the platform makes every step feel like a win-whether you're unlocking lessons, completing trade missions, or earning practice badges.
      </p>
    </div>

     <div className="alerts-card1">
                <img src={sl8} className="img-icon" alt="avatar1" />
     </div>
 </div>
</div>

 <div className="section3-container">
      

     <div className="section3-layout">
    <div className="alerts-card2">
                       <img src={sl9} className="img-icon1" alt="avatar1" />

    </div>
 <div className="market-highlights">
      <h2>The 'Market Aunty' MBA: Bite-Sized Wisdom That Actually Sticks</h2>
      <ul>
        <li className="highlight-orange"> 'Buy Tesla with GTB without losing 30% to fees'</li>
        <li className="highlight-orange"> 'Spot fake Binance ads on Nigerian Twitter'</li>
        <li className="highlight-orange"> 'Convert crypto profits to physical ₦ in Lagos markets'</li>
      </ul>
      <p className="bottom-note">
      No theoritical Wall Street jargon. Our hyper-local tutorials solve actual Nigerian problems. Each lesson ends with a virtual trade challenge = turning theory into muscle memory while you wait for suya.
      </p>
    </div>
  </div>
</div>
     </> 
  );
};

export default Section3;
