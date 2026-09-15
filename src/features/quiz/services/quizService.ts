import { questions } from "@/features/quiz/dictionaries/quizDictionary";
import type { QuestionBankLanguage } from "@/features/quiz/dictionaries/quizDictionary";
import { getQuizBySlug, getQuizzes } from "@/features/quiz/sanity/api";
import type { Quiz } from "@/features/quiz/sanity/types";
import { adaptSanityQuizToQuestionBank } from "./sanityAdapter";

export type QuizSource = "local" | "sanity";
export type QuizContentLocale = "en" | "ru" | "ua";

/** UI locale (incl. cz) → quiz content locale */
export function mapQuizContentLocale(lang: string): QuizContentLocale {
  if (lang === "ru" || lang === "en" || lang === "ua") return lang;
  // Czech UI: new question bank authored in Russian
  return "ru";
}

/** Slug из URL, иначе DEFAULT env, иначе первый активный квиз в Sanity */
export async function resolveSanityQuizSlug(
  sanitySlug?: string,
): Promise<string> {
  if (sanitySlug?.trim()) return sanitySlug.trim();

  const defaultSlug = process.env.NEXT_PUBLIC_DEFAULT_QUIZ_SLUG?.trim();
  if (defaultSlug) return defaultSlug;

  const quizzes = await getQuizzes();
  if (quizzes.length === 0) {
    throw new Error("No active quizzes found in Sanity");
  }
  const first = quizzes[0].slug?.current;
  if (!first) {
    throw new Error("Active quiz has no slug");
  }
  return first;
}

/** Одна загрузка квиза из Sanity + адаптация вопросов */
export async function fetchActiveSanityQuiz(
  lang: string,
  sanitySlug?: string,
): Promise<{ quiz: Quiz; data: QuestionBankLanguage }> {
  const locale = mapQuizContentLocale(lang);
  const slug = await resolveSanityQuizSlug(sanitySlug);
  const quiz = await getQuizBySlug(slug);

  if (!quiz) {
    throw new Error(`Quiz with slug "${slug}" not found in Sanity`);
  }
  if (!quiz.isActive) {
    throw new Error(`Quiz "${slug}" is not active`);
  }

  const data = adaptSanityQuizToQuestionBank(quiz, locale);
  return { quiz, data };
}

/**
 * Получает вопросы из выбранного источника
 */
export async function getQuestions(
  source: QuizSource = "local",
  lang: string = "ua",
  sanitySlug?: string,
): Promise<QuestionBankLanguage> {
  const locale = mapQuizContentLocale(lang);

  if (source === "local") {
    const bank = questions[locale] || questions.ua || questions.ru;
    if (!bank) {
      throw new Error(`Questions for language "${lang}" not found`);
    }
    return bank;
  }

  if (source === "sanity") {
    const { data } = await fetchActiveSanityQuiz(lang, sanitySlug);
    return data;
  }

  throw new Error("Unsupported source");
}

export async function getSanityQuiz(slug: string) {
  return getQuizBySlug(slug);
}
