"use client";

import { useState } from "react";
import { PaperclipIcon, ArrowUpIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Chatbot() {
  const [question, setQuestion] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold text-center">
          Any Questions for Your Financial Benefit?
        </h1>
        <p className="text-xl text-gray-600 text-center">
          401k, ESPP, Roth and more.
        </p>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">

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
                <Button size="icon" variant="ghost" className="bg-green-50">
                  <ArrowUpIcon className="w-4 h-4 text-green-600" />
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex items-center space-x-2 p-4">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Upload your payslip for a optimized allocation plan",
                "Rewatch the tutorial video on your financial benefits",
                "Check out the articles you need to know",
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  className="text-gray-700"
                >
                  {suggestion}
                  <ArrowUpIcon className="w-4 h-4 ml-2" />
                </Button>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
