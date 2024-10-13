"use client";

import { useState } from "react";
import { PaperclipIcon, ArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ChatBot() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // State for chat history
  const [isChatActive, setIsChatActive] = useState(false); // State to track view
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const askQuestion = async () => {
    if (!question) return; // Prevent empty submissions

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({ 
              "query": question,
              "companyId": "Google",
         }), // Send question as JSON
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      // Update chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { question, answer: result?.response}, // Store question and answer
      ]);
      setIsChatActive(true); // Switch to chat view
      setQuestion(""); // Clear input
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const renderChatHistory = () => {
    return (
      <div className="flex flex-col space-y-4">
        {chatHistory.map((chat, index) => (
          <div key={index} className="p-4 bg-gray-200 rounded-md">
            <div>
              <strong>You:</strong> {chat.question}
            </div>
            <div>
              <strong>Bot:</strong> {chat.answer}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold text-center">
          Any Questions for Your Financial Benefit?
        </h1>
        <p className="text-xl text-gray-600 text-center">
          401k, ESPP, Roth, and more.
        </p>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            {isChatActive ? (
              renderChatHistory() // Render chat history
            ) : (
              <div className="relative">
                <Input
                  type="text"
                  placeholder="How much should I contribute to my 401k?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full pr-20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                  <Button size="icon" variant="ghost">
                    <PaperclipIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-green-50"
                    onClick={askQuestion}
                  >
                    <ArrowUpIcon className="w-4 h-4 text-green-600" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex items-center space-x-2 p-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                className="text-gray-700"
                onClick={() => router.push("/video_player")} // Navigate to tutorial page
              >
                Rewatch the tutorial video on your financial benefits
                <ArrowUpIcon className="w-4 h-4 ml-2" />
              </Button>

              <Button
                variant="outline"
                className="text-gray-700"
                onClick={() => router.push("/")} // Navigate to articles page
              >
                Check out the articles you need to know
                <ArrowUpIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
