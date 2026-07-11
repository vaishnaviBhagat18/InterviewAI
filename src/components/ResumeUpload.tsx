interface ResumeUploadProps {
  resumeText: string;
  setResumeText: (value: string) => void;
}

export default function ResumeUpload({
  resumeText,
  setResumeText,
}: ResumeUploadProps) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        Resume Content
      </label>

      <textarea
        value={resumeText}
        onChange={(e) =>
          setResumeText(e.target.value)
        }
        placeholder="Paste your resume content here..."
        className="min-h-52 w-full rounded-xl border border-slate-300 px-4 py-3"
      />

      <p className="mt-2 text-sm text-slate-500">
        InterviewAI will generate personalized questions based on
        your resume.
      </p>
    </div>
  );
}

        // {interviewMode === "resume" && (
        //   <div className="rounded-xl border bg-slate-50 p-4">
        //     <p className="font-medium">
        //       Upload Resume
        //     </p>

        //     {/* <input
        //         type="file"
        //         accept=".pdf"
        //         onChange={uploadResume}
        //       /> */}

        //     <textarea
        //       value={resumeText}
        //       onChange={(e) => setResumeText(e.target.value)}
        //       placeholder="Paste your resume content here..."
        //       className="w-full min-h-[200px] rounded-xl border p-3"
        //     />

        //     <p className="mt-2 text-sm text-slate-500">
        //       {/* InterviewAI will generate personalized
        //         questions based on your projects,
        //         skills and experience. */}

        //       Paste your resume content and InterviewAI
        //       will generate personalized questions
        //       based on your projects, skills and experience.

        //     </p>

        //     {resumeName && (
        //       <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm">
        //         Resume Loaded: {resumeName}
        //       </div>
        //     )}
        //   </div>
        // )}
