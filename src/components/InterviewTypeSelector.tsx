type InterviewTypeSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function InterviewTypeSelector({
  value,
  onChange,
}: InterviewTypeSelectorProps) {
  const interviewTypes = [
    "Technical",
    "HR",
    "Behavioral",
    "Mixed",
  ];

  return (
    <div>
      <label className="block mb-2 font-medium text-gray-800">
        Interview Type
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Type</option>

        {interviewTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}