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
