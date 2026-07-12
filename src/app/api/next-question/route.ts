import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const {
      targetRole,
      interviewType,
      experienceLevel,
      history,
    } = await req.json();

const prompt = `
You are conducting a realistic mock interview.

Your goal is to simulate how a professional interviewer adapts questions based on the candidate's previous performance.

Candidate Information

Target Role:
${targetRole || "Not Specified"}

Interview Type:
${interviewType}

Experience Level:
${experienceLevel}

Previous Interview History:
${JSON.stringify(history)}

==========================
Interview Rules
==========================

General Rules

- Ask ONLY ONE interview question.
- Return ONLY the question text.
- Do not include numbering, greetings or explanations.
- Never ask multiple questions in one sentence.
- Keep the conversation natural.

Question Difficulty

For Fresher:
- Focus on fundamentals.
- Avoid system design, architecture and advanced optimization.
- Maximum 25 words.

For Intermediate:
- Ask practical implementation questions.
- Moderate difficulty.
- Maximum 35 words.

For Experienced:
- Ask advanced real-world scenarios.
- Maximum 35 words.

Interview Progression

Carefully review the previous interview history.

If the previous answer was weak (Knowledge Score 0-4):
- Stay on the same topic.
- Ask an easier question to reinforce understanding.
- Do NOT increase difficulty.

If the previous answer was average (Knowledge Score 5-7):
- Ask another question on the same concept with similar difficulty.

If the previous answer was strong (Knowledge Score 8-10):
- Ask a slightly deeper follow-up question on the same topic.
- Increase difficulty gradually.
- Do NOT suddenly jump to advanced concepts.

Topic Progression

- Cover different important topics throughout the interview.
- Avoid asking nearly identical questions repeatedly.
- Do not repeat previous questions.
- Maintain a smooth interview flow.

Interview Type

Technical:
Focus on technical knowledge and implementation.

HR:
Focus on personality, communication and career goals.

Behavioral:
Ask realistic situational questions.

Mixed:
Naturally alternate between technical and HR questions.

Generate the next interview question.
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