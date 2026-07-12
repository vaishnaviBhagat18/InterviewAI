import { Input } from "@/components/ui/input";

interface InterviewSettingsProps {
  interviewMode: string;

  interviewType: string;
  setInterviewType: (value: string) => void;

  experienceLevel: string;
  setExperienceLevel: (value: string) => void;

  targetRole: string;
  setTargetRole: (value: string) => void;

  targetCompany: string;
  setTargetCompany: (value: string) => void;
}

export default function InterviewSettings({
  interviewMode,
  interviewType,
  setInterviewType,
  experienceLevel,
  setExperienceLevel,
  targetRole,
  setTargetRole,
  targetCompany,
  setTargetCompany,
}: InterviewSettingsProps) {
  return (
    <>
      {/* Interview Type */}

      <div>
        <label className="mb-2 block font-medium">
          Interview Type
        </label>

        <select
          value={interviewType}
          onChange={(e) =>
            setInterviewType(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
        >
          <option value="">Select Type</option>
          <option value="technical">Technical</option>
          <option value="hr">HR</option>
          <option value="behavioral">Behavioral</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      {/* Experience Level */}

      <div>
        <label className="mb-2 block font-medium">
          Experience Level
        </label>

        <select
          value={experienceLevel}
          onChange={(e) =>
            setExperienceLevel(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
        >
          <option value="">Select Level</option>
          <option value="fresher">Fresher</option>
          <option value="intermediate">
            Intermediate
          </option>
          <option value="experienced">
            Experienced
          </option>
        </select>
      </div>

      {/* Target Role - Only for Quick Practice */}

      {interviewMode === "general" && (
        <div>
          <label className="mb-2 block font-medium">
            Target Role
          </label>

          <Input
            value={targetRole}
            onChange={(e) =>
              setTargetRole(e.target.value)
            }
            placeholder="e.g. Software Engineer"
            // className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>
      )}

      {/* Target Company */}

      <div>
        <label className="mb-2 block font-medium">
          Target Company (Optional)
        </label>

        <Input
          value={targetCompany}
          onChange={(e) =>
            setTargetCompany(e.target.value)
          }
          placeholder="e.g. Google"
          // className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>
    </>
  );
}