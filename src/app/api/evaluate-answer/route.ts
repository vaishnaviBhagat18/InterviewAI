import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
      const {
          question,
          answer,
          experienceLevel,
      } = await req.json();

      const prompt = `
You are evaluating an interview answer.

Experience Level:
${experienceLevel}

Question:
${question}

Candidate Answer:
${answer}

Instructions:

- Be realistic.
- Be concise.
- Do not write essays.

Return exactly:

Knowledge Score: X/10

Clarity Score: X/10

Confidence Score: X/10

Strength:
One sentence.

Improvement:
One sentence.

Ideal Answer:
Maximum 4 lines for Fresher.
Maximum 6 lines for Intermediate.
Maximum 8 lines for Experienced.
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