import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: Request) {
     console.log("API route reached");
     console.log("KEY EXISTS:", !!process.env.GROQ_API_KEY);
     
  try {
    const {
      // career,
      interviewType,
      experienceLevel,
      targetRole,
      targetCompany,
      interviewMode,
      resumeText,
    } = await req.json();


const prompt = `
You are an experienced technical interviewer conducting a realistic mock interview.

Your goal is to help the candidate prepare for real placement interviews by asking clear, relevant, and professional questions.

Candidate Information

Target Role:
${targetRole || "Not Specified"}

Interview Type:
${interviewType}

Experience Level:
${experienceLevel}

Target Company:
${targetCompany || "Not Specified"}

Interview Mode:
${interviewMode}

Resume Content:
${resumeText || "Not Provided"}

==========================
Interview Rules
==========================

General Rules

- Ask ONLY ONE question.
- Return ONLY the question text.
- Do not include numbering, greetings, explanations or markdown.
- Keep the question conversational, like a real interviewer.
- Maximum 25 words for Freshers.
- Maximum 35 words for Intermediate and Experienced candidates.
- Never combine multiple questions into one.
- Never ask follow-up questions before the candidate answers.

Experience Level

If Experience Level is Fresher:
- Ask beginner placement-level questions.
- Focus on fundamentals and core concepts.
- Avoid system design and highly advanced topics.
- Questions should be answerable within 2-3 minutes.

If Experience Level is Intermediate:
- Ask practical implementation questions.
- Include project-based thinking where appropriate.
- Moderate difficulty.

If Experience Level is Experienced:
- Ask advanced real-world scenarios.
- Include architecture, optimization or design decisions where appropriate.

Interview Type

Technical:
- Ask technical knowledge and implementation questions.

HR:
- Ask personality, communication and career-related questions.

Behavioral:
- Ask situation-based questions using previous experiences.

Mixed:
- Alternate naturally between technical and HR style questions.

Target Company

If a Target Company is provided:
- Adjust the style and difficulty to match the company's interview expectations.
- Do not ask company-specific trivia.

Resume Mode

If Interview Mode is "resume":

- Prioritize projects mentioned in the resume.
- Then ask about skills.
- Then technologies.
- Finally ask about achievements or responsibilities.
- Ask naturally, not by reading bullet points.
- Never invent information that does not exist in the resume.

Question Quality

A good question should:
- Test one concept only.
- Be realistic.
- Be concise.
- Encourage explanation rather than one-word answers.

Generate the best possible interview question.
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

    const question =
      completion.choices[0]?.message?.content;

    console.log(question);

    return NextResponse.json({
      question,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate question",
      },
      {
        status: 500,
      }
    );
  }
}


