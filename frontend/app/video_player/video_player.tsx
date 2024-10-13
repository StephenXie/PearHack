"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, PlayIcon, PauseIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const VIDEO_URL = "https://www.youtube.com/embed/szb0QJXIm_8";

export default function TutorialVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  const tutorialVideos = [
    { title: "Your Financial Benefit Preview", url: VIDEO_URL },
    // Add more video chapters as needed
  ];

  const handlePrevious = () => {
    router.push("/onboarding");
  };

  const handleNext = () => {
    router.push("/quiz");
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">{tutorialVideos[0].title}</h1>
          <div className="aspect-video mb-4 relative">
            <iframe
              className="w-full h-full rounded-lg"
              src={tutorialVideos[0].url}
              title={tutorialVideos[0].title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <Button
              className="absolute bottom-4 left-4 bg-black/50 hover:bg-black/70"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6" />
              )}
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <Button onClick={handlePrevious} variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              1 / {tutorialVideos.length}
            </span>
            <Button onClick={handleNext} variant="outline">
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
