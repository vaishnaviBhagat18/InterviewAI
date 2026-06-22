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

        <div>
          <label className="mb-2 block font-medium">
            Choose Interview Mode
          </label>

          <div className="grid grid-cols-2 gap-4">

            <div
              onClick={() => setInterviewMode("general")}
              className={`cursor-pointer rounded-xl border p-5 transition-all ${interviewMode === "general"
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-white"
                }`}
            >
              <h3 className="font-semibold text-lg">
                🎯 General Interview
              </h3>

              <p className="text-sm text-slate-600">
                Practice placement and interview fundamentals.
              </p>
            </div>

            <div
              onClick={() => setInterviewMode("resume")}
              className={`cursor-pointer rounded-xl border p-5 transition-all ${interviewMode === "resume"
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-white"
                }`}
            >
              <h3 className="font-semibold text-lg">
                📄 Resume-Based Interview
              </h3>

              <p className="text-sm text-slate-600">
                Personalized questions based on your resume.
              </p>
            </div>

          </div>
        </div>

        <CardContent className="space-y-6">
          {/* <div>
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
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="AI/ML Engineer">AI/ML Engineer</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div> */}

          <div>
            <label className="mb-2 block font-medium">
              Role Applying For
            </label>

            <select
              value={targetRole}
              onChange={(e) => {
                console.log("Role:", e.target.value);
                setTargetRole(e.target.value);
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="">Select Role</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="AI/ML Engineer">AI/ML Engineer</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Cybersecurity">Cybersecurity</option>
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

          <div>
            <label className="mb-2 block font-medium">
              Experience Level
            </label>

            <select
              value={experienceLevel}
              onChange={(e) =>
                setExperienceLevel(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm"
            >
              <option value="Fresher">Fresher</option>
              <option value="Intermediate">
                Intermediate
              </option>
              <option value="Experienced">
                Experienced
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Organization Applying To (Optional)
            </label>

            <Input
              placeholder="Google"
              value={organization}
              onChange={(e) =>
                setOrganization(e.target.value)
              }
            />
          </div>

          {interviewMode === "resume" && (
            <div className="rounded-xl border bg-slate-50 p-4">
              <p className="font-medium">
                Upload Resume
              </p>

              {/* <input
                type="file"
                accept=".pdf"
                onChange={uploadResume}
              /> */}

              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here..."
                className="w-full min-h-[200px] rounded-xl border p-3"
              />

              <p className="mt-2 text-sm text-slate-500">
                {/* InterviewAI will generate personalized
                questions based on your projects,
                skills and experience. */}

                Paste your resume content and InterviewAI
                will generate personalized questions
                based on your projects, skills and experience.

              </p>

              {resumeName && (
                <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm">
                  Resume Loaded: {resumeName}
                </div>
              )}
            </div>
          )}
          <Button
            size="lg"
            className="w-full text-lg font-semibold"
            onClick={generateQuestion}
            disabled={
              !targetRole ||
              !interviewType ||
              loading
            }
          >
            {loading
              ? "Generating..."
              : "Generate Interview"}
          </Button>
          {/* <p>Target Role: {targetRole}</p>
          <p>Type: {interviewType}</p> */}

          {question && (
            <div className="rounded-xl border bg-slate-50 p-4">
              <h3 className="font-semibold mb-2">
                Question {questionNumber} / 5
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
          {evaluation && questionNumber < 5 && (
            <Button
              className="w-full"
              onClick={getNextQuestion}
            >
              Next Question
            </Button>
          )}
          {questionNumber >= 5 && evaluation && (
            <div className="rounded-xl border bg-blue-50 p-4">
              <h3 className="font-bold">
                Interview Complete 🎉
              </h3>

              <p>
                You completed all 5 interview rounds.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}