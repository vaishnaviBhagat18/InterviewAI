export type Career =
  | "fullstack"
  | "frontend"
  | "backend"
  | "aiml"
  | "dataanalyst"
  | "cybersecurity";

export type InterviewType =
  | "technical"
  | "hr"
  | "behavioral"
  | "mixed";

export interface Feedback {
  evaluation: string;
  idealAnswer: string;
}

export interface QuestionResponse {
  question: string;
}