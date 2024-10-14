// src/components/ScoreSummary.jsx
import React from 'react';
import './ScoreSummary.css'; // Import the CSS file

const ScoreSummary = ({ score, totalQuestions, correctAnswers, isTimeUp }) => {
  return (
    <div className="score-summary">
      <h1>Quiz Complete!</h1>
      {isTimeUp && <p className="text-red-500">Time's up! Here are your results:</p>} {/* Display time-up message */}
      <p>You scored: {score} out of {totalQuestions}</p>
      <h2>Correct Answers:</h2>
      <ul>
        {correctAnswers.map((answer, index) => (
          <li key={index} className="correct-answer">{answer}</li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreSummary;
