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
You are an experienced technical interviewer evaluating a candidate's interview answer.

Your goal is to provide fair, realistic and constructive feedback, similar to what a human interviewer would give after a mock interview.

Experience Level:
${experienceLevel}

Interview Question:
${question}

Candidate Answer:
${answer}

==========================
Evaluation Guidelines
==========================

Evaluate the answer based on:

1. Knowledge
- Is the answer technically correct?
- Does it answer the actual question?
- Are important concepts missing?

2. Clarity
- Is the explanation easy to understand?
- Is the answer well structured?
- Is unnecessary information avoided?

3. Confidence
- Estimate confidence ONLY from the writing style.
- Well-structured and direct answers indicate higher confidence.
- Hesitant, incomplete or uncertain wording indicates lower confidence.
- Do NOT assume confidence beyond what the answer shows.

Scoring Rules

- Use realistic scores.
- Do NOT give 10/10 unless the answer is nearly perfect.
- Average answers should receive around 5-7.
- Good placement-level answers usually score 7-8.
- Reward correctness more than length.
- Do not penalize candidates for concise answers if they are accurate.

Ideal Answer

Generate an interview-quality ideal answer.

For Fresher:
- Maximum 4 lines.
- Use simple language.
- Focus on core concepts.

For Intermediate:
- Maximum 6 lines.
- Include practical explanation.

For Experienced:
- Maximum 8 lines.
- Include real-world considerations where appropriate.

==========================
Output Format
==========================

Return EXACTLY in the following format:

Knowledge Score: X/10

Clarity Score: X/10

Confidence Score: X/10

Verdict:
(Possible values: Excellent || Good || Average || Needs Improvement)

Strength:
One concise sentence.

Improvement:
One concise sentence explaining the biggest improvement.

Ideal Answer:
(Generate the ideal answer here)

Do not include any markdown, headings or additional commentary.
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