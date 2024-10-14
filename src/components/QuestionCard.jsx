// src/components/QuestionCard.jsx
import React from 'react';

const QuestionCard = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState('');

  const handleAnswer = () => {
    onAnswer(selectedAnswer === question.correct_answer);
  };

  // Create an array of answer options with labels
  const answerOptions = question.incorrect_answers.concat(question.correct_answer).map((answer, index) => {
    return { label: String.fromCharCode(65 + index), answer }; // Converts index to A, B, C, D...
  });

  return (
    <div className="card">
      <h2 className="question">{question.question}</h2>
      <div className="mt-3">
        {answerOptions.map(({ label, answer }, index) => (
          <label key={index} className="option flex items-center">
            <input
              type="radio"
              name="answer"
              value={answer}
              onChange={() => setSelectedAnswer(answer)}
              className="mr-2"
            />
            <span className="answer-label">{label}. {answer}</span>
          </label>
        ))}
      </div>
      <button onClick={handleAnswer} className="mt-2 bg-blue-500 text-white p-2 rounded">Submit Answer</button>
    </div>
  );
};

export default QuestionCard;
