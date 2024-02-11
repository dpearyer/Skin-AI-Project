import React from 'react';
import Image from './Image';

function Hero({handlePageChange}) {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Guarantee skin health with the power of preventive healthcare</h1>
          <h1>Unlock the power of AI vision and go from Think to Know</h1>
          <p>SkinAI uses advanced camera-based AI to analyze your skin and give you personalized insights and solutions.</p>

          <Image/>
          <a href="#" onClick={() => handlePageChange('SecondPage')} className="button primary">Start your free skin analysis</a>
        </div>
        <div className="hero-visual">
        <img src="./components/mel2.jpg" alt="Early stage melasma" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
