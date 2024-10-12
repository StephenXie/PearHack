import { useState } from "react";
import { PaperclipIcon, ArrowUpIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Component() {
  const [question, setQuestion] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold text-center">
          What can I help you ship?
        </h1>
        <p className="text-xl text-gray-600 text-center">
          Generate UI, ask questions, debug, execute code, and much more.
        </p>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                Need more messages? Get higher limits with Premium.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="text-green-600 hover:text-green-700"
              >
                Upgrade Plan
                <XIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="relative">
              <Input
                type="text"
                placeholder="Ask v0 a question..."
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
            <Button variant="outline" size="sm">
              <PaperclipIcon className="w-4 h-4 mr-2" />
              Project
            </Button>
            <Button variant="ghost" size="icon">
              <ArrowUpIcon className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Generate a multi-step onboarding flow",
            "How can I schedule cron jobs?",
            "A function to flatten nested arrays",
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
      </div>
    </div>
  );
}
