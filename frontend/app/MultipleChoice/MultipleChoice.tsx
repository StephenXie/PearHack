"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
interface Question {
  Question: string;
  Option_1: string;
  Option_2: string;
  Option_3: string;
  Option_4: string;
  Correct_Answer: string;
  Explanation: string;
}
export default function MultipleChoice() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        var res = null;
        var companyId = "Google";
        await fetch(`https://deep-stable-gorilla.ngrok-free.app/api/generate_mcq?companyId=${companyId}`, {
          method: "GET",
        })
          .then((data) => {
            return data.json();
          })
          .then((response) => {
            res = response;
          });
        setQuestions(res?.question);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load questions. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);
  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
  };
  const handleNextQuestion = () => {
    const correctAnswer = questions[currentQuestion].Correct_Answer;
    if (selectedAnswer === `Option_${correctAnswer}`) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };
  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setQuizCompleted(false);
  };
  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <p className="text-center">Loading questions...</p>
        </CardContent>
      </Card>
    );
  }
  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <p className="text-center text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }
  if (quizCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Quiz Completed!
          </h2>
          <p className="text-center mb-4">
            Your score: {score} out of {questions.length}
          </p>
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            onClick={resetQuiz}
          >
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }
  const currentQuestionData = questions[currentQuestion];
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-green-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {currentQuestionData.Question}
        </h2>
        <div className="space-y-3">
          {["Option_1", "Option_2", "Option_3", "Option_4"].map(
            (option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full justify-start text-left h-auto py-3 px-4 ${
                  selectedAnswer === option
                    ? "border-green-500 bg-green-50"
                    : ""
                }`}
                onClick={() => handleAnswerClick(option)}
                disabled={showExplanation}
              >
                {currentQuestionData[option as keyof Question]}
              </Button>
            )
          )}
        </div>
        {!showExplanation && (
          <Button
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            Submit Answer
          </Button>
        )}
        {showExplanation && (
          <div className="mt-6">
            <p className="mb-4">
              <strong>Explanation:</strong> {currentQuestionData.Explanation}
            </p>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={moveToNextQuestion}
            >
              {currentQuestion < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
