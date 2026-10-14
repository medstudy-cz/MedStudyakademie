"use client";

import { usePathname } from "next/navigation";
import { QuizProvider } from "@/features/quiz/context/QuizContext";

/**
 * Slug из URL: /quiz/[quizSlug] (чешский без префикса) или /{locale}/quiz/[quizSlug].
 * Без slug — дефолтный квиз.
 */
export function QuizProviderFromRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);
  const quizIndex = segments.indexOf("quiz");
  const sanitySlug =
    quizIndex >= 0 && segments[quizIndex + 1]
      ? segments[quizIndex + 1]
      : undefined;
  const providerKey = sanitySlug ?? "__default__";

  return (
    <QuizProvider key={providerKey} sanitySlug={sanitySlug}>
      {children}
    </QuizProvider>
  );
}
