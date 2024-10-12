"use client";
import React, { useState } from 'react';
import Quiz1 from './Quiz1'; // Import your Quiz1 component

type Option = {
  label: string;
  isCorrect: boolean;
};

type Question = {
  question: string;
  options: Option[];
};

const QuizContainer: React.FC = () => {
  const questions: Question[] = [
    {
      question: "What makes BTC scarce?",
      options: [
        { label: "A limit to how many can", isCorrect: true },
        { label: "Unlimited supply", isCorrect: false },
        { label: "Government regulation", isCorrect: false },
        { label: "Because it's digital", isCorrect: false },
      ],
    },
    {
      question: "Who created Bitcoin?",
      options: [
        { label: "Satoshi Nakamoto", isCorrect: true },
        { label: "Elon Musk", isCorrect: false },
        { label: "Vitalik Buterin", isCorrect: false },
        { label: "Craig Wright", isCorrect: false },
      ],
    },
    {
      question: "When was Bitcoin launched?",
      options: [
        { label: "2008", isCorrect: true },
        { label: "2010", isCorrect: false },
        { label: "2015", isCorrect: false },
        { label: "2020", isCorrect: false },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0); // Track the current question
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // Track selected option
  const [isAnswered, setIsAnswered] = useState(false); // Track if the current question is answered

  // Handle option click
  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setIsAnswered(true);
  };

  // Move to the next question and reset selected option and answered state
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); // Reset selected option
      setIsAnswered(false); // Reset answered state
    }
  };

  // Calculate progress (percentage)
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div style={styles.container}>
      {/* Progress Bar */}
      <div style={styles.progressBarContainer}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
      </div>

      {/* Render the current question */}
      <Quiz1
        question={questions[currentQuestion].question}
        options={questions[currentQuestion].options}
        selectedOption={selectedOption}
        onOptionClick={handleOptionClick}
        isAnswered={isAnswered}
      />

      {/* Next button */}
      {currentQuestion < questions.length - 1 && (
        <button style={styles.nextButton} onClick={handleNextQuestion}>
          Next Question
        </button>
      )}

      {/* Show "Quiz Complete" message at the end */}
      {currentQuestion === questions.length - 1 && <p>Quiz Complete! 🎉</p>}
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
    padding: '40px',
    width: '800px',
    maxWidth: '90vw',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
  },
  progressBarContainer: {
    width: '90%',
    backgroundColor: '#ddd',
    height: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: '5px',
  },
  nextButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default QuizContainer;