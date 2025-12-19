export interface Question {
  type: "objectives" | "theory" | "fill-in-the-blank";
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}
export interface Section {
  questions: Question[];
}

export interface SectionValue {
  sectionAlphabet: string;
  scoreObtainable: string;
  questionType: string;
}
