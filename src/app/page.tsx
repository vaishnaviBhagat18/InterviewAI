"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

export default function Home() {
  const [career, setCareer] = useState("");
  const [interviewType, setInterviewType] = useState("");

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState("");
  

  const generateQuestion = async () => {
    console.log("Generating question...");

    try {
      setLoading(true);

      const response = await fetch(
        "/api/generate-question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            career,
            interviewType,
          }),
        }
      );

      console.log("Response:", response);

      const data = await response.json();

      console.log("Data:", data);

      setQuestion(data.question);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/evaluate-answer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
            answer,
          }),
        }
      );

      const data = await response.json();

      setEvaluation(data.evaluation);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6">
      <Card className="w-full max-w-3xl shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-5xl font-bold text-center tracking-tight">
            InterviewAI
          </CardTitle>

          <CardDescription className="text-center text-base">
            Practice interviews with AI-powered feedback
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <label className="mb-2 block font-medium">
              Career Field
            </label>

            <select
              value={career}
              onChange={(e) => {
                console.log("Career:", e.target.value);
                setCareer(e.target.value);
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="">Select Career</option>
              <option value="fullstack">Full Stack Developer</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="aiml">AI/ML Engineer</option>
              <option value="dataanalyst">Data Analyst</option>
              <option value="cybersecurity">Cybersecurity</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Interview Type
            </label>

            <select
              value={interviewType}
              onChange={(e) => {
                console.log("Type:", e.target.value);
                setInterviewType(e.target.value);
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="">Select Type</option>
              <option value="technical">Technical</option>
              <option value="hr">HR</option>
              <option value="behavioral">Behavioral</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          <Button
            size="lg"
            className="w-full text-lg font-semibold"
            onClick={generateQuestion}
            disabled={
              !career ||
              !interviewType ||
              loading
            }
          >
            {loading
              ? "Generating..."
              : "Generate Interview"}
          </Button>
          <p>Career: {career}</p>
          <p>Type: {interviewType}</p>

          {question && (
            <div className="rounded-xl border bg-slate-50 p-4">
              <h3 className="mb-2 font-semibold">
                Interview Question
              </h3>

              <p>{question}</p>
            </div>
          )}

          {question && (
            <div className="space-y-4">
              <Textarea
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={8}
              />

              <Button
                size="lg"
                className="w-full text-lg font-semibold"
                onClick={evaluateAnswer}
                disabled={!answer}
              >
                Evaluate Answer
              </Button>
            </div>
          )}
          {evaluation && (
            <div className="rounded-xl border bg-green-50 p-4">
              <h3 className="font-semibold mb-2">
                AI Feedback
              </h3>

              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {evaluation}
              </div>            
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}