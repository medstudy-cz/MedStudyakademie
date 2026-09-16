import type { Answer } from "@/features/quiz/context/QuizContext";
import type { Locale } from "@/features/quiz/dictionaries/promptsDictionary";

/** Полный текст для промпта / админ-письма */
export function formatAnswers(answers: Answer[], _locale: Locale): string {
  return answers
    .map((a, i) => `Вопрос ${i + 1}: "${a.question}"\nОтвет: "${a.answer}"`)
    .join("\n\n");
}

/**
 * Короткий формат для Bitrix COMMENTS (номер + полный ответ),
 * чтобы не раздувать URI webhook.
 */
export function formatAnswersForBitrix(answers: Answer[]): string {
  return answers
    .filter((a) => a.question !== "Form submitted")
    .map((a, i) => `${i + 1}. ${a.answer}`)
    .join("\n");
}

/** HTML-блок Q&A для дублирующего письма админу */
export function formatAnswersHtmlForAdmin(answers: Answer[]): string {
  const rows = answers
    .filter((a) => a.question !== "Form submitted")
    .map(
      (a, i) =>
        `<p style="margin:0 0 12px;"><strong>${i + 1}. ${escapeHtml(a.question)}</strong><br/>${escapeHtml(a.answer)}</p>`,
    )
    .join("");

  return `
<section style="font-family:sans-serif;color:#153060;margin-bottom:24px;">
  <h2 style="font-size:18px;margin:0 0 12px;">Ответы квиза</h2>
  ${rows || "<p>Нет ответов</p>"}
</section>
`.trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
