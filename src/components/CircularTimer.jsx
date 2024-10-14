// src/components/CircularTimer.jsx
import React from 'react';
import './CircularTimer.css'; // Import the CSS file for styles

const CircularTimer = ({ remainingTime, totalTime }) => {
  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (remainingTime / totalTime) * circumference;

  return (
    <div className="circular-timer">
      <svg className="timer-svg" width="120" height="120">
        <circle
          className="timer-circle"
          cx="60"
          cy="60"
          r={radius}
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
      <div className="timer-text">{remainingTime} s</div>
    </div>
  );
};

export default CircularTimer;
