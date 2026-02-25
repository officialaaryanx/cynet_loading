import React, { useState, useEffect } from "react";
import "./loading.css";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const totalDots = 62;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // 5 seconds loading
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  // Cyber Color Palette
  const cyberColors = ["#00f3ff", "#ff00ff", "#39ff14", "#ff003c"];

  return (
    <div className="cyber-spiral-container">
      {/* Cinematic Overlays */}
      <div className="scanlines"></div>
      <div className="vignette"></div>
      
      <div className="wrapper">
        {[...Array(totalDots)].map((_, i) => (
          <i 
            key={i} 
            style={{ 
              "--i": i,
              "--clr": cyberColors[i % 4] // Rotating through Blue, Pink, Green, Red
            }}
          ></i>
        ))}
        
        {/* The Core Logo */}
        <div className="center-content">
          <h1 className="cyber-glitch-text" data-text="CYNET">CYNET</h1>
          <div className="status-bar">
            <span className="status-label">Loading...</span>
            <div className="progress-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
