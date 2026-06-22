import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const {
      career,
      interviewType,
      history,
    } = await req.json();

    const prompt = `
You are an interviewer.

Career: ${career}
Interview Type: ${interviewType}

Interview History:
${JSON.stringify(history, null, 2)}

Generate the NEXT interview question.

Rules:
- Ask a follow-up question related to previous discussion.
- Increase difficulty gradually.
- Candidate is a fresher.
- Return only the question.
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