import React from 'react';
import './CSS/Section2.css';
import sl1 from '../Components/Assets/sl1.PNG';
import sl2 from '../Components/Assets/sl2.PNG';
import sl3 from '../Components/Assets/sl3.PNG';

const Section2 = () => {
  return (
    <div className="section2-container">
      <div className="section2-header">
  <div className="section2-title">
    <h2>The 3 AM Questions Every Nigerian Investor Asks (But Won’t Admit)</h2>
  </div>
  <div className="section2-subtext">
    <p>
      Navigating global markets from Nigeria can feel risky—fake crypto platforms, odd trading hours, and the volatile Naira make investing stressful. StockUp breaks down these barriers so you can learn safely and confidently.
    </p>
  </div>
</div>

<div className="section2-cards">
  <div className="section2-card">
  <img src={sl1} className="card-icon" alt="avatar1" />
    <h4>The Trust Abyss</h4>
    <p>
      With dozens of fake exchanges, pump-and-dump tokens, and unverified influencers promoting scams, it’s hard to tell what’s legit. Many Nigerians have lost funds to platforms that looked real but weren’t.
    </p>
  </div>

  <div className="section2-card purple-card">
  <img src={sl2} className="card-icon" alt="avatar1" />
    <h4>The Timezone Prison</h4>
    <p>
      Global markets operate on schedules that disregard Nigerian realities. When critical opportunities happen at 3am WAT or during essential family moments, you’re forced to choose between financial progress and daily life.
    </p>
  </div>

  <div className="section2-card">
  <img src={sl3} className="card-icon" alt="avatar1" />
    <h4>The Currency Roulette</h4>
    <p>
      “You execute the perfect Tesla trade – $1,000 profit! But when withdrawal time comes, the Naira has plunged from ₦1,200 to ₦1,600 per dollar. Suddenly your ‘win’ buys 25% fewer groceries. It’s the brutal math facing every Nigerian global investor.”
    </p>
  </div>
</div>

    </div>
  );
};

export default Section2;
