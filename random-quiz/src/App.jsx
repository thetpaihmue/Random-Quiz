import { useState } from 'react';
import QuizApp from './quiz/quiz'; // Import the QuizApp component
import Menu from './menu/menu';
import './App.css';

const App = () => {
  const [showQuiz, setShowQuiz] = useState(false); // State to toggle quiz visibility

  const handleStartQuiz = () => {
    setShowQuiz(true); // Show quiz when button is clicked
  };

  const handleQuitQuiz = () => {
    setShowQuiz(false); // Hide quiz and show menu again
  };

  return (
    <div className="app-container">
      {!showQuiz ? (
        <>
          <button className="start-quiz-button" onClick={handleStartQuiz}>Start Quiz</button> {/* Button to start the quiz */}
          <Menu /> {/* Render Menu component */}
        </>
      ) : (
        <QuizApp onQuit={handleQuitQuiz} /> 
      )}

    </div>
  );
};

export default App;