import type { Answer } from "@/features/quiz/context/QuizContext";
import type { Locale } from "@/features/quiz/dictionaries/promptsDictionary";

export function formatAnswers(answers: Answer[], _locale: Locale): string {
  return answers
    .map((a) => `Вопрос: "${a.question}"\nОтвет: "${a.answer}"`)
    .join("\n\n");
}
