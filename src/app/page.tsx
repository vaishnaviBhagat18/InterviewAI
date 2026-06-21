"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [career, setCareer] = useState("");
  const [interviewType, setInterviewType] = useState("");

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
              onChange={(e) => setCareer(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onChange={(e) => setInterviewType(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          >
            Generate Interview
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}