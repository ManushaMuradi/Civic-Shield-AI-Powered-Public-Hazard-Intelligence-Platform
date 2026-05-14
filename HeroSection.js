import React from 'react';
import Features from './Features';

// 1. Import your images here
import drainageImg from '../assets/drinage.jpg';
import garbageImg from '../assets/garbage.jpg';
import roadImg from '../assets/road.jpg';
import topRightImg from '../assets/topright.png'; // New image for top right

const HeroSection = () => {
  return (
    <div className="hero-container">
      
      {/* Left Side: Real Images */}
      <div className="hero-left">
        <div className="image-stack">
          <img 
            src={drainageImg} 
            alt="Drainage Leakage" 
            className="hazard-img" 
          />
          <img 
            src={garbageImg} 
            alt="Garbage Accumulation" 
            className="hazard-img" 
          />
          <img 
            src={roadImg} 
            alt="Damaged Road" 
            className="hazard-img" 
          />
        </div>
      </div>

      {/* Right Side: Content */}
      <div className="hero-right">
        
        {/* New Image at Top Right */}
        <img 
          src={topRightImg} 
          alt="Civic Shield AI" 
          className="top-right-image" 
        />

        <span className="badge">AI-Powered Civic Platform</span>
        
        <h1 className="main-headline">Report Smart, <br/> Act Faster.</h1>
        
        <h2 className="sub-headline">Build Safer Cities.</h2>
        
        <p className="description">
          Report local issues anonymously and track resolutions in real-time with AI-driven priority. 
          Making communities safer, one report at a time.
        </p>

        {/* Features List */}
        <Features />

      </div>
    </div>
  );
};

export default HeroSection;