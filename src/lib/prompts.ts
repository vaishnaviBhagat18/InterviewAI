export const generateQuestionPrompt = (
  role: string,
  type: string,
  level: string
) => `
Generate ONE interview question.

Role: ${role}
Interview Type: ${type}
Experience Level: ${level}

Rules:
- Keep question short.
- Suitable for selected level.
- Ask only one question.
`;