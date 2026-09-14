"use client";

import { usePathname } from "next/navigation";
import { QuizProvider } from "@/features/quiz/context/QuizContext";

/**
 * Slug из URL: /{locale}/quiz/[quizSlug].
 * /{locale}/quiz → дефолтный квиз (env или первый active в Sanity).
 */
export function QuizProviderFromRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);
  // [locale, "quiz"] | [locale, "quiz", slug]
  const sanitySlug =
    segments[1] === "quiz" && segments[2] ? segments[2] : undefined;
  const providerKey = sanitySlug ?? "__default__";

  return (
    <QuizProvider key={providerKey} sanitySlug={sanitySlug}>
      {children}
    </QuizProvider>
  );
}
