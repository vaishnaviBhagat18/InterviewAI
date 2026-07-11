interface InterviewModeToggleProps {
  interviewMode: string;
  setInterviewMode: (
    mode: string
  ) => void;
}

export default function InterviewModeToggle({
  interviewMode,
  setInterviewMode,
}: InterviewModeToggleProps) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        Choose Interview Mode
      </label>

      <div className="grid grid-cols-2 gap-4">

        <div
          onClick={() =>
            setInterviewMode("general")
          }
          className={`cursor-pointer rounded-xl border p-5 transition-all ${
            interviewMode === "general"
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
          onClick={() =>
            setInterviewMode("resume")
          }
          className={`cursor-pointer rounded-xl border p-5 transition-all ${
            interviewMode === "resume"
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
  );
}


        // <div>
        //   <label className="mb-2 block font-medium">
        //     Choose Interview Mode
        //   </label>

        //   <div className="grid grid-cols-2 gap-4">

        //     <div
        //       onClick={() => setInterviewMode("general")}
        //       className={`cursor-pointer rounded-xl border p-5 transition-all ${interviewMode === "general"
        //         ? "border-blue-500 bg-blue-50"
        //         : "border-slate-300 bg-white"
        //         }`}
        //     >
        //       <h3 className="font-semibold text-lg">
        //         🎯 General Interview
        //       </h3>

        //       <p className="text-sm text-slate-600">
        //         Practice placement and interview fundamentals.
        //       </p>
        //     </div>

        //     <div
        //       onClick={() => setInterviewMode("resume")}
        //       className={`cursor-pointer rounded-xl border p-5 transition-all ${interviewMode === "resume"
        //         ? "border-blue-500 bg-blue-50"
        //         : "border-slate-300 bg-white"
        //         }`}
        //     >
        //       <h3 className="font-semibold text-lg">
        //         📄 Resume-Based Interview
        //       </h3>

        //       <p className="text-sm text-slate-600">
        //         Personalized questions based on your resume.
        //       </p>
        //     </div>

        //   </div>
        // </div>
