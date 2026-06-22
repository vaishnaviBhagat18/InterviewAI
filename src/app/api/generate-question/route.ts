import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: Request) {
     console.log("API route reached");
     console.log("KEY EXISTS:", !!process.env.GROQ_API_KEY);
     
  try {
    const {
      career,
      interviewType,
      experienceLevel,
    } = await req.json();

    const prompt = `
You are an interviewer conducting a mock interview.

Candidate Role:
${career}

Interview Type:
${interviewType}

Experience Level:
${experienceLevel}

Rules:

If Fresher:
- Ask beginner placement-level questions.
- Focus on fundamentals.
- Keep question under 25 words.

If Intermediate:
- Ask moderate practical questions.

If Experienced:
- Ask advanced real-world questions.

Generate ONLY ONE question.

Return only the question text.
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


// import { NextResponse } from "next/server";
// import { openai } from "@/lib/openai";

// export async function POST(req: Request) {
//   try {
//     const { career, interviewType } = await req.json();

//     const prompt = `
// Generate ONE interview question.

// Career Field: ${career}
// Interview Type: ${interviewType}

// The question should be suitable for a fresher.

// Return only the question.
// `;

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });

//     const question =
//       response.choices[0].message.content;

//     return NextResponse.json({
//       question,
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         error: "Failed to generate question",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }