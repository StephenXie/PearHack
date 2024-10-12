"use client";

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    question: "What makes BTC scarce?",
    answers: ["A limit to how many can be created", "Unlimited supply", "Government regulation", "Because it's digital"],
    correctAnswer: "A limit to how many can be created"
  },
  {
    question: "What is the maximum supply of Bitcoin?",
    answers: ["1 million", "21 million", "100 million", "Unlimited"],
    correctAnswer: "21 million"
  },
  {
    question: "Who created Bitcoin?",
    answers: ["Satoshi Nakamoto", "Vitalik Buterin", "Elon Musk", "Mark Zuckerberg"],
    correctAnswer: "Satoshi Nakamoto"
  }
]

export default function MultipleChoice() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizCompleted(false)
  }

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Quiz Completed!</h2>
          <p className="text-center mb-4">Your score: {score} out of {questions.length}</p>
          <Button 
            className="w-full bg-green-500 hover:bg-green-600 text-white" 
            onClick={resetQuiz}
          >
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  const currentQuestionData = questions[currentQuestion]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-green-500 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">{currentQuestionData.question}</h2>
        <div className="space-y-3">
          {currentQuestionData.answers.map((answer, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full justify-start text-left h-auto py-3 px-4 ${
                selectedAnswer === answer ? 'border-green-500 bg-green-50' : ''
              }`}
              onClick={() => handleAnswerClick(answer)}
            >
              {answer}
            </Button>
          ))}
        </div>
        <Button 
          className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white" 
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
        >
          {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </CardContent>
    </Card>
  )
}