import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const {
      career,
      interviewType,
      experienceLevel,
      history,
    } = await req.json();

    const prompt = `
You are conducting a mock interview.

Role:
${career}

Interview Type:
${interviewType}

Experience Level:
${experienceLevel}

Previous Interview History:
${JSON.stringify(history)}

Rules:

For Fresher:
- Keep questions short.
- Focus on fundamentals.
- Avoid advanced architecture topics.

If previous Knowledge Score:

0-4:
Ask an easier foundational question.

5-7:
Ask a similar difficulty question.

8-10:
Ask a slightly deeper follow-up.

Question length must be under 25 words.

Return ONLY the next question.
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

    return NextResponse.json({
      question:
        completion.choices[0]?.message?.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}