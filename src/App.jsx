// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';
import ScoreSummary from './components/ScoreSummary';
import './App.css'; // Import your CSS file if not already imported

const App = () => {
  const [categories, setCategories] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false); // New state to track if time is up

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('https://opentdb.com/api_category.php');
      setCategories(response.data.trivia_categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isQuizActive) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isQuizActive]);

  const startQuiz = async (category, difficulty, numberOfQuestions) => {
    const response = await axios.get(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`);
    setQuizData(response.data.results);
    setIsQuizActive(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setRemainingTime(numberOfQuestions * 30);
    setIsTimeUp(false); // Reset time up state when starting a new quiz
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const resetQuiz = () => {
    setIsQuizActive(false);
    setQuizData([]);
    setRemainingTime(0);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsTimeUp(false); // Reset time up state when resetting the quiz
  };

  useEffect(() => {
    if (isQuizActive && remainingTime > 0) {
      const timerId = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (remainingTime === 0) {
      // When time is up, navigate to the ScoreSummary
      setIsQuizActive(false);
      setIsTimeUp(true); // Mark time is up
      setCurrentQuestionIndex(quizData.length); // Show ScoreSummary
    }
  }, [isQuizActive, remainingTime, quizData.length]);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold">Jamtech Quiz App</h1>
      <p className="text-lg text-red-500">Time Remaining: {remainingTime} seconds</p> {/* Timer in red */}
      {!isQuizActive ? (
        <QuizStart categories={categories} startQuiz={startQuiz} />
      ) : currentQuestionIndex < quizData.length ? (
        <QuestionCard question={quizData[currentQuestionIndex]} onAnswer={handleAnswer} />
      ) : (
        <ScoreSummary
          score={score}
          totalQuestions={quizData.length}
          correctAnswers={quizData.filter(q => q.correct_answer).map(q => q.correct_answer)}
          isTimeUp={isTimeUp} // Pass the isTimeUp state to ScoreSummary
        />
      )}
      <button onClick={resetQuiz} className="mt-4 bg-blue-500 text-white p-2">Retake Quiz</button>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto text-center rounded-t-md shadow-lg opacity-90">
        <p className="text-sm">Created by @James Niyongira</p>
      </footer>
    </div>
  );
};

export default App;
