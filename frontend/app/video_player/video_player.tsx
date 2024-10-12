"use client";

import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

// You would replace this with your actual Mux playback ID
const MUX_PLAYBACK_ID = "DS00Spx1CV902MCtPj5WknGlR102V5HFkDe";

export default function TutorialVideoPlayer() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  const router = useRouter();
  // This would be replaced with your actual tutorial video data
  const tutorialVideos = [
    { title: "Your Benefit Preview", playbackId: MUX_PLAYBACK_ID },
    // Add more video chapters as needed
  ];

  const handlePrevious = () => {
    router.push("/onboarding");
  };

  const handleNext = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            {tutorialVideos[currentVideoIndex].title}
          </h1>
          <div className="aspect-video mb-4">
            <MuxPlayer
              playbackId={tutorialVideos[currentVideoIndex].playbackId}
              metadata={{
                video_title: tutorialVideos[currentVideoIndex].title,
                player_name: "Tutorial Video Player",
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              disabled={currentVideoIndex === 0}
              variant="outline"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentVideoIndex + 1} / {tutorialVideos.length}
            </span>
            <Button
              onClick={handleNext}
              disabled={currentVideoIndex === tutorialVideos.length - 1}
              variant="outline"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
