import { client } from "@/sanity/lib/client";
import {
  quizzesQuery,
  quizBySlugQuery,
  quizWithOrderedQuestionsQuery,
} from "./queries";
import type { Quiz, QuizListItem } from "./types";

/**
 * Get all active quizzes
 */
export async function getQuizzes(): Promise<QuizListItem[]> {
  try {
    const quizzes = await client.fetch<QuizListItem[]>(quizzesQuery);
    return quizzes;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
}

/**
 * Get a single quiz by slug
 */
export async function getQuizBySlug(slug: string): Promise<Quiz | null> {
  try {
    const quiz = await client.fetch<Quiz>(quizWithOrderedQuestionsQuery, {
      slug,
    });
    return quiz;
  } catch (error) {
    console.error(`Error fetching quiz with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Check if a quiz exists and is active
 */
export async function isQuizActive(slug: string): Promise<boolean> {
  try {
    const quiz = await client.fetch<Quiz>(quizBySlugQuery, { slug });
    return quiz?.isActive || false;
  } catch (error) {
    console.error(`Error checking quiz status for "${slug}":`, error);
    return false;
  }
}

/**
 * Get quiz count
 */
export async function getQuizCount(): Promise<number> {
  try {
    const count = await client.fetch<number>(
      `count(*[_type == "quiz" && isActive == true])`,
    );
    return count;
  } catch (error) {
    console.error("Error fetching quiz count:", error);
    return 0;
  }
}
