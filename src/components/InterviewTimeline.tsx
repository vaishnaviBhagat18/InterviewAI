interface InterviewHistoryItem {
  question: string;
  answer: string;
  evaluation: string;
}

interface InterviewTimelineProps {
  history: InterviewHistoryItem[];
}

export default function InterviewTimeline({
  history,
}: InterviewTimelineProps) {
  if (history.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">
        Interview Progress
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {history.map((item, index) => (
          <div
            key={index}
            className="min-w-[320px] rounded-xl border bg-white p-4 shadow"
          >
            <h3 className="font-semibold mb-2">
              Question {index + 1}
            </h3>

            <p className="text-sm mb-3">
              {item.question}
            </p>

            <div className="border-t pt-2">
              <p className="font-medium text-sm">
                Your Answer
              </p>

              <p className="text-sm text-slate-600">
                {item.answer}
              </p>
            </div>

            <div className="border-t pt-2 mt-2">
              <p className="font-medium text-sm">
                AI Feedback
              </p>

              <p className="text-sm whitespace-pre-wrap">
                {item.evaluation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}