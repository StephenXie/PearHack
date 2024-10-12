import React from 'react';
import MultipleChoice from './quiz'; // Import the QuizContainer component

export default function quiz() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <MultipleChoice />
    </div>
  );
}