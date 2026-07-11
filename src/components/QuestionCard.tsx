import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface QuestionCardProps {
  question: string;
  questionNumber: number;

  answer: string;
  setAnswer: (value: string) => void;

  evaluation: string;

  onEvaluate: () => void;
  onNextQuestion: () => void;

  loading: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,

  answer,
  setAnswer,

  evaluation,

  onEvaluate,
  onNextQuestion,

  loading,
}: QuestionCardProps) {
  if (!question) return null;

  return (
    <>
      {/* Question */}

      <div className="rounded-xl border bg-slate-50 p-4">
        <h3 className="mb-2 font-semibold">
          Question {questionNumber} / 5
        </h3>

        <p>{question}</p>
      </div>

      {/* Answer */}

      <div className="space-y-4">
        <Textarea
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          rows={8}
        />

        <Button
          className="w-full"
          size="lg"
          onClick={onEvaluate}
          disabled={!answer || loading}
        >
          Evaluate Answer
        </Button>
      </div>

      {/* Feedback */}

      {evaluation && (
        <>
          <div className="rounded-xl border bg-green-50 p-4">
            <h3 className="mb-2 font-semibold">
              AI Feedback
            </h3>

            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {evaluation}
            </div>
          </div>

          {questionNumber < 5 ? (
            <Button
              className="w-full"
              onClick={onNextQuestion}
            >
              Next Question
            </Button>
          ) : (
            <div className="rounded-xl border bg-blue-50 p-4">
              <h3 className="font-bold">
                Interview Complete 🎉
              </h3>

              <p>
                You completed all 5 interview rounds.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}

          // {question && (
          //   <div className="rounded-xl border bg-slate-50 p-4">
          //     <h3 className="font-semibold mb-2">
          //       Question {questionNumber} / 5
          //     </h3>
          //     <p>{question}</p>
          //   </div>
          // )}

          // {question && (
          //   <div className="space-y-4">
          //     <Textarea
          //       placeholder="Type your answer here..."
          //       value={answer}
          //       onChange={(e) => setAnswer(e.target.value)}
          //       rows={8}
          //     />

          //     <Button
          //       size="lg"
          //       className="w-full text-lg font-semibold"
          //       onClick={evaluateAnswer}
          //       disabled={!answer}
          //     >
          //       Evaluate Answer
          //     </Button>
          //   </div>
          // )}
          // {evaluation && (
          //   <div className="rounded-xl border bg-green-50 p-4">
          //     <h3 className="font-semibold mb-2">
          //       AI Feedback
          //     </h3>

          //     <div className="whitespace-pre-wrap text-sm leading-relaxed">
          //       {evaluation}
          //     </div>
          //   </div>
          // )}
          // {evaluation && questionNumber < 5 && (
          //   <Button
          //     className="w-full"
          //     onClick={getNextQuestion}
          //   >
          //     Next Question
          //   </Button>
          // )}
          // {questionNumber >= 5 && evaluation && (
          //   <div className="rounded-xl border bg-blue-50 p-4">
          //     <h3 className="font-bold">
          //       Interview Complete 🎉
          //     </h3>

          //     <p>
          //       You completed all 5 interview rounds.
          //     </p>
          //   </div>
          // )}
