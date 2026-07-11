interface InterviewSettingsProps {
  interviewMode: string;

  interviewType: string;
  setInterviewType: (value: string) => void;

  experienceLevel: string;
  setExperienceLevel: (value: string) => void;

  targetRole: string;
  setTargetRole: (value: string) => void;

  organization: string;
  setOrganization: (value: string) => void;
}

export default function InterviewSettings({
  interviewMode,
  interviewType,
  setInterviewType,
  experienceLevel,
  setExperienceLevel,
  targetRole,
  setTargetRole,
  organization,
  setOrganization,
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

      {/* Experience */}

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
          <option value="fresher">Fresher</option>
          <option value="intermediate">
            Intermediate
          </option>
          <option value="experienced">
            Experienced
          </option>
        </select>
      </div>

      {/* Only General Mode */}

      {interviewMode === "general" && (
        <div>
          <label className="mb-2 block font-medium">
            Role Applying For
          </label>

          <input
            value={targetRole}
            onChange={(e) =>
              setTargetRole(e.target.value)
            }
            placeholder="Software Engineer"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>
      )}

      {/* Company */}

      <div>
        <label className="mb-2 block font-medium">
          Organization Applying To (Optional)
        </label>

        <input
          value={organization}
          onChange={(e) =>
            setOrganization(e.target.value)
          }
          placeholder="Google, Microsoft..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>
    </>
  );
}


        // <CardContent className="space-y-6">
        //   {/* <div>
        //     <label className="mb-2 block font-medium">
        //       Career Field
        //     </label>

        //     <select
        //       value={career}
        //       onChange={(e) => {
        //         console.log("Career:", e.target.value);
        //         setCareer(e.target.value);
        //       }}
        //       className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
        //     >
        //       <option value="">Select Career</option>
        //       <option value="Full Stack Developer">Full Stack Developer</option>
        //       <option value="Frontend Developer">Frontend Developer</option>
        //       <option value="Backend Developer">Backend Developer</option>
        //       <option value="AI/ML Engineer">AI/ML Engineer</option>
        //       <option value="Data Analyst">Data Analyst</option>
        //       <option value="Cybersecurity">Cybersecurity</option>
        //     </select>
        //   </div> */}

        //   <div>
        //     <label className="mb-2 block font-medium">
        //       Role Applying For
        //     </label>

        //     <select
        //       value={targetRole}
        //       onChange={(e) => {
        //         console.log("Role:", e.target.value);
        //         setTargetRole(e.target.value);
        //       }}
        //       className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
        //     >
        //       <option value="">Select Role</option>
        //       <option value="Full Stack Developer">Full Stack Developer</option>
        //       <option value="Frontend Developer">Frontend Developer</option>
        //       <option value="Backend Developer">Backend Developer</option>
        //       <option value="AI/ML Engineer">AI/ML Engineer</option>
        //       <option value="Data Analyst">Data Analyst</option>
        //       <option value="Cybersecurity">Cybersecurity</option>
        //     </select>
        //   </div>


        //   <div>
        //     <label className="mb-2 block font-medium">
        //       Interview Type
        //     </label>

        //     <select
        //       value={interviewType}
        //       onChange={(e) => {
        //         console.log("Type:", e.target.value);
        //         setInterviewType(e.target.value);
        //       }}
        //       className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
        //     >
        //       <option value="">Select Type</option>
        //       <option value="technical">Technical</option>
        //       <option value="hr">HR</option>
        //       <option value="behavioral">Behavioral</option>
        //       <option value="mixed">Mixed</option>
        //     </select>
        //   </div>

        //   <div>
        //     <label className="mb-2 block font-medium">
        //       Experience Level
        //     </label>

        //     <select
        //       value={experienceLevel}
        //       onChange={(e) =>
        //         setExperienceLevel(e.target.value)
        //       }
        //       className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm"
        //     >
        //       <option value="Fresher">Fresher</option>
        //       <option value="Intermediate">
        //         Intermediate
        //       </option>
        //       <option value="Experienced">
        //         Experienced
        //       </option>
        //     </select>
        //   </div>

        //   <div>
        //     <label className="mb-2 block font-medium">
        //       Organization Applying To (Optional)
        //     </label>

        //     <Input
        //       placeholder="Google"
        //       value={organization}
        //       onChange={(e) =>
        //         setOrganization(e.target.value)
        //       }
        //     />
        //   </div>
