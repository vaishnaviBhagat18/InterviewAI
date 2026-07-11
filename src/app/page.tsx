"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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


import InterviewModeToggle from "@/components/InterviewModeToggle";
import InterviewSettings from "@/components/InterviewSettings";
import ResumeUpload from "@/components/ResumeUpload";
import QuestionCard from "@/components/QuestionCard";

export default function Home() {
  // const [career, setCareer] = useState("");
  const [interviewType, setInterviewType] = useState("");

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState("");

  const [questionNumber, setQuestionNumber] = useState(1);

  const [interviewHistory, setInterviewHistory] = useState<
    {
      question: string;
      answer: string;
      evaluation: string;
    }[]
  >([]);

  const [experienceLevel, setExperienceLevel] =
    useState("Fresher");

  const [interviewMode, setInterviewMode] = useState("general");

  const [targetRole, setTargetRole] = useState("");

  const [organization, setOrganization] = useState("");

  const [resumeText, setResumeText] = useState("");
  const [resumeName, setResumeName] = useState("");

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
            // career,
            interviewType,
            experienceLevel,
            targetRole,
            organization,
            interviewMode,
            resumeText,
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
            experienceLevel,
          }),
        }
      );

      const data = await response.json();

      setEvaluation(data.evaluation);

      setInterviewHistory((prev) => [
        ...prev,
        {
          question,
          answer,
          evaluation: data.evaluation,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getNextQuestion = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/next-question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // career,
            interviewType,
            history: interviewHistory,
          }),
        }
      );

      const data = await response.json();

      setQuestion(data.question);

      setAnswer("");

      setEvaluation("");

      setQuestionNumber((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setResumeName(file.name);

    const formData = new FormData();

    formData.append("resume", file);

    try {
      const response = await fetch(
        "/api/upload-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setResumeText(data.text);

      console.log(data.text);
    } catch (error) {
      console.error(error);
    }
  };

  const canGenerate =
    interviewMode === "general"
      ? targetRole && interviewType
      : resumeText && interviewType;


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
          <InterviewModeToggle
            interviewMode={interviewMode}
            setInterviewMode={setInterviewMode}
          />

          <InterviewSettings
            interviewMode={interviewMode}
            interviewType={interviewType}
            setInterviewType={setInterviewType}
            experienceLevel={experienceLevel}
            setExperienceLevel={setExperienceLevel}
            targetRole={targetRole}
            setTargetRole={setTargetRole}
            organization={organization}
            setOrganization={setOrganization}
          />

          {interviewMode === "resume" && (
            <ResumeUpload
              resumeText={resumeText}
              setResumeText={setResumeText}
            />
          )}

          <Button
            size="lg"
            className="w-full text-lg font-semibold"
            onClick={generateQuestion}
            // disabled={!canGenerate || loading}
            disabled={!interviewType || loading}
          >
            {loading
              ? "Generating..."
              : "Generate Interview"}
          </Button>

          <QuestionCard
            question={question}
            questionNumber={questionNumber}
            answer={answer}
            setAnswer={setAnswer}
            evaluation={evaluation}
            onEvaluate={evaluateAnswer}
            onNextQuestion={getNextQuestion}
            loading={loading}
          />

        </CardContent>
      </Card>
    </main >
  );
}