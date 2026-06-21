"use client";

import { useState } from "react";
import CareerSelector from "@/components/CareerSelector";
import InterviewTypeSelector from "@/components/InterviewTypeSelector";

export default function Home() {
  const [career, setCareer] = useState("");
  const [interviewType, setInterviewType] = useState("");

  return (
    <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
          InterviewAI
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Practice interviews with AI-powered feedback
        </p>

        <div className="space-y-4">
          <CareerSelector
            value={career}
            onChange={setCareer}
          />

          <InterviewTypeSelector
            value={interviewType}
            onChange={setInterviewType}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg transition"
          >
            Generate Interview
          </button>
        </div>
      </div>
    </main>
  );
}