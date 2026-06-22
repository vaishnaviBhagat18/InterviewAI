import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { question, answer } =
      await req.json();

    const prompt = `
You are an expert technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer honestly.

Return in this exact format:

Knowledge Score: X/10

Clarity Score: X/10

Confidence Score: X/10

Strengths:
- point 1
- point 2

Areas to Improve:
- point 1
- point 2

Ideal Answer:
Provide a concise but interview-ready answer that would score 10/10.
`;
    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const evaluation =
      completion.choices[0]?.message?.content;

    return NextResponse.json({
      evaluation,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to evaluate answer",
      },
      {
        status: 500,
      }
    );
  }
}