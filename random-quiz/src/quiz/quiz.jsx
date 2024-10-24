import { useEffect, useState } from 'react';
import quizData from '../assets/quizData';
import './quiz.css';

// eslint-disable-next-line react/prop-types
const QuizApp = ({ onQuit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    // Shuffle quizData and select the first 10 questions
    const shuffledQuestions = quizData.sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffledQuestions.slice(0, 10));
  }, []);

  // Check if there are any selected questions
  const currentQuestion = selectedQuestions[currentQuestionIndex];

  const handleAnswerChange = (option) => {
    if (selectedAnswers.includes(option)) {
      setSelectedAnswers(selectedAnswers.filter(answer => answer !== option));
    } else {
      setSelectedAnswers([...selectedAnswers, option]);
    }
  };

  const checkAnswer = () => {
    if (!currentQuestion) return; // Early return if currentQuestion is undefined

    const sortedSelectedAnswers = selectedAnswers.sort();
    const sortedCorrectAnswers = currentQuestion.correctAnswers.sort();

    if (JSON.stringify(sortedSelectedAnswers) === JSON.stringify(sortedCorrectAnswers)) {
      setScore(score + 1);
    } else {
      alert(`Incorrect! The correct answers are: ${sortedCorrectAnswers.join(', ')}`);
    }

    setSelectedAnswers([]); // Reset selected answers for next question
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz finished! Your score: ${score + 1}/${selectedQuestions.length}`);
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };


  return (
    <div>
        <div className='quitBtn'>
        <p>Score: {score}</p>

      <button onClick={onQuit}>Quit</button> {/* Quit button to go back to the main app */}
      </div>
      {currentQuestion ? (
        <>
          <h2>{currentQuestion.question}</h2>
          <p>Question {currentQuestionIndex + 1} of {selectedQuestions.length}</p>
          {currentQuestion.options.map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={selectedAnswers.includes(option)}
                onChange={() => handleAnswerChange(option)}
              />
              <label>{option}</label>
            </div>
          ))}
          <div className='submitBtn'>
          <button onClick={checkAnswer}>Submit Answer</button>
          </div>
        </>
      ) : (
        <p>Loading questions...</p> // Optional loading message
      )}
    </div>
  );
};

export default QuizApp;
