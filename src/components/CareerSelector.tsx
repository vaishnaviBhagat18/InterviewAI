type CareerSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CareerSelector({
  value,
  onChange,
}: CareerSelectorProps) {
  const careers = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "AI/ML Engineer",
    "Data Analyst",
    "Cybersecurity",
  ];

  return (
    <div>
      <label className="block mb-2 font-medium text-gray-800">
        Career Field
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Career</option>

        {careers.map((career) => (
          <option key={career} value={career}>
            {career}
          </option>
        ))}
      </select>
    </div>
  );
}
