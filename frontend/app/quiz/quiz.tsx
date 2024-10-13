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
  const [questions, setQuestions] = useState<Question[]>([
        {
            "Question": "What is the 401(k) Matching Program offered by Google?",
            "Option_1": "Google matches 100% of employee contributions up to $10,000 annually.",
            "Option_2": "Google matches 50% of employee contributions up to $19,500 annually.",
            "Option_3": "Google matches 100% of employee contributions up to $3,000 or 50% up to the IRS limit annually, whichever is greater.",
            "Option_4": "Google matches 50% of employee contributions with no annual limit.",
            "Correct_Answer": "Option_3",
            "Explanation": "Google's 401(k) Matching Program offers a match of 100% of employee contributions up to $3,000 or 50% of contributions up to the IRS limit per calendar year, whichever amount is greater. This means that Google will fully match the first $3,000 of your contributions, and beyond that, they match half of your contributions up to the IRS limit. Every dollar of the match is fully vested."
        },
        {
            "Question": "What is the annual cap for Google's Student Loan Repayment Plan?",
            "Option_1": "$1,500",
            "Option_2": "$2,500",
            "Option_3": "$5,000",
            "Option_4": "$10,000",
            "Correct_Answer": "Option_2",
            "Explanation": "Google's Student Loan Repayment Plan matches 100% of your student loan contributions up to a $2,500 annual cap. This means Google will contribute an amount equal to what you pay, capped at $2,500 per year, towards the principal of your student loan."
        },
       {
            "Question": "What is a Mega Backdoor Roth IRA, and how does it benefit Google employees?",
            "Option_1": "A retirement savings option allowing employees to contribute after-tax dollars to a Roth IRA, potentially exceeding normal contribution limits.",
            "Option_2": "A special Google program that matches employee donations to charity up to $10,000.",
            "Option_3": "An insurance plan that covers personal accidents up to 3 times the annual salary.",
            "Option_4": "A tuition reimbursement program for job-related courses.",
            "Correct_Answer": "Option_1",
            "Explanation": "The Mega Backdoor Roth IRA is a strategy that allows employees to contribute after-tax dollars to a Roth IRA, potentially exceeding the normal contribution limits. This can be beneficial for high-income earners at Google who want to maximize their retirement savings."
        },
        {
            "Question": "What is the annual contribution made by Google to an employee's Health Savings Account (HSA) for individual coverage?",
            "Option_1": "$500",
            "Option_2": "$1,000",
            "Option_3": "$1,500",
            "Option_4": "$2,000",
            "Correct_Answer": "Option_2",
            "Explanation": "Google contributes $1,000 per year to an employee's Health Savings Account (HSA) for individual coverage. This is a benefit provided to help employees manage their healthcare expenses."
        },
        {
            "Question": "What is the amount provided as a Relocation Bonus for Google employees?",
            "Option_1": "$5,000",
            "Option_2": "$10,000",
            "Option_3": "$15,000",
            "Option_4": "$20,000",
            "Correct_Answer": "Option_2",
            "Explanation": "Google offers a Relocation Bonus of $10,000 to its employees. This is a one-time payment provided to assist employees with moving expenses when relocating for work."
        }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [color, setColor] = useState("green");
  useEffect(() => {
    let isMounted = true; // track if the component is mounted

    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/generate_mcq?companyId=Google`
        );
        const response = await res.json();
        
        if (isMounted) {
          setIsLoading(false);
          // setQuestions(response?.questions || []);
          const qs = console.log(questions);
        }
      } catch (err) {
        if (isMounted) {
          // setError("Failed to load questions. Please try again later.");
          setIsLoading(false);
        }
      }
    };

    fetchQuestions();

    // Cleanup function to avoid setting state on an unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const correctAnswer = questions[currentQuestion].Correct_Answer;
    console.log(selectedAnswer === correctAnswer)
    if (selectedAnswer === correctAnswer) {
      setScore((prev) => prev + 1);
      setColor("green");
    } else {
      alert("Incorrect Answer")
      setColor("red");
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
        <CardContent className="p-6 flex justify-center items-center">
          <svg
            className="animate-spin h-8 w-8 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <p className="ml-4">Loading questions...</p>
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
          {currentQuestionData?.Question}
        </h2>
        <div className="space-y-3">
          {["Option_1", "Option_2", "Option_3", "Option_4"].map(
            (option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full justify-start text-left h-auto py-3 px-4 ${
                  selectedAnswer === option
                    ? `border-gray-500 bg-gray-50`
                    : ""
                }`}
                onClick={() => handleAnswerClick(option)}
                disabled={showExplanation}
              >
                {currentQuestionData?.[option as keyof Question] ?? "Option not available"}
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
