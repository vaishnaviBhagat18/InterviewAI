import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
}); 


// import OpenAI from "openai";

// export const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
