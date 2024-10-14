// src/components/QuizStart.jsx
import React, { useState } from 'react';

const QuizStart = ({ categories, startQuiz }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const handleStartQuiz = () => {
    startQuiz(selectedCategory, difficulty, numberOfQuestions);
  };

  return (
    <div>
      <h2 className="text-2xl">Start a New Quiz</h2>
      <select
        className="mt-2 p-2 border rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="" disabled>Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      
      <select
        className="mt-2 p-2 border rounded"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        type="number"
        className="mt-2 p-2 border rounded"
        value={numberOfQuestions}
        onChange={(e) => setNumberOfQuestions(e.target.value)}
        min="1"
        max="50"
      />

      <button
        onClick={handleStartQuiz}
        className="mt-4 bg-blue-500 text-white p-2"
        disabled={!selectedCategory}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;
