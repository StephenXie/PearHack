import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, Lightbulb, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link className="flex items-center justify-center" href="#">
              <BrainCircuit className="h-6 w-6 mr-2" />
              <span className="font-bold">FENE.ai</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#features"
              >
                Features
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#how-it-works"
              >
                How It Works
              </Link>
            </nav>
          </header>
          <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                      Understand Your Employee Financial Benefits
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                      FENE.ai simplifies employee financial benefits understanding, making sure you are on top of your benefits package.
                    </p>
                  </div>
                  <div className="w-full max-w-sm space-y-2">
                    <Link href="/onboarding">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <section
              id="features"
              className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
            >
              <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card className="transform transition-all hover:scale-105">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <Lightbulb className="h-12 w-12 text-primary" />
                      <h3 className="text-2xl font-bold">
                        AI-Powered Insights
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Get personalized explanations of your benefits package.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="transform transition-all hover:scale-105">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <Users className="h-12 w-12 text-primary" />
                      <h3 className="text-2xl font-bold">
                        Interactive Learning
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Engage with our AI generated learning module to deepen your understanding.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="transform transition-all hover:scale-105">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <Zap className="h-12 w-12 text-primary" />
                      <h3 className="text-2xl font-bold">Real time Q&A with AI Agent</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Stay informed about changes to your benefits.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
            <section
              id="how-it-works"
              className="w-full py-12 md:py-24 lg:py-32"
            >
              <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                  How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-bold">Sign Up</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Create your account and input your benefits information.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-bold">Ask Questions</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Interact with our AI to learn about your benefits.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-bold">Optimize</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Receive personalized recommendations to maximize your
                      benefits.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      Ready to Optimize Your Benefits?
                    </h2>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Join thousands of employees who have already unlocked the
                      full potential of their benefits package.
                    </p>
                  </div>
                  <div className="w-full max-w-sm space-y-2">
                    <Link href="/onboarding">
                      <Button className="w-full">Get Started Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2024 FENE.ai . All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Privacy
              </Link>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}
