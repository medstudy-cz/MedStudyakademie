"use client";
import React, { useState, useEffect } from "react";
import { AnswerButton } from "../ui/AnswerButton";
import { ProgressBar } from "../ui/ProgressBar";
import { Button } from "../ui/Button";
import { useQuiz } from "@/features/quiz/context/QuizContext";
import { useLocale, useTranslations } from "next-intl";
import type { Option, Question } from "@/features/quiz/dictionaries/quizDictionary";
import { trackEvent } from "@/features/quiz/utils/analytics";
import { sendEventToServer } from "@/features/quiz/utils/sendEvent";

function resolveQuestionList(
  questions: ReturnType<typeof useQuiz>["questions"],
  role: string | null,
  level: string | null,
): Question[] {
  if (!questions || !role) return [];
  const roleQuestions = (
    questions as unknown as Record<string, Record<string, Question[] | undefined>>
  )[role];
  if (!roleQuestions) return [];
  if (level && Array.isArray(roleQuestions[level]) && roleQuestions[level]!.length) {
    return roleQuestions[level]!;
  }
  if (Array.isArray(roleQuestions.all) && roleQuestions.all.length) {
    return roleQuestions.all;
  }
  return [];
}

export function QuizScreen() {
  const {
    questions,
    role,
    level,
    currentIndex,
    setCurrentIndex,
    setAnswers,
    answers,
    setStep,
    setReportPromise,
    sanityQuiz,
  } = useQuiz();

  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const t = useTranslations("QuizScreen");
  const locale = useLocale() || "ua";

  const questionList = resolveQuestionList(questions, role, level);
  const current = questionList[currentIndex];

  useEffect(() => {
    if (!current && questionList.length > 0) {
      setStep("form");
    }
  }, [current, questionList.length, setStep]);

  useEffect(() => {
    setSelectedOptions([]);
    setInputValue("");
  }, [currentIndex]);

  const toggleMultiSelectOption = (opt: string) => {
    setSelectedOptions((prev) =>
      prev.includes(opt) ? prev.filter((item) => item !== opt) : [...prev, opt],
    );
  };

  const finishQuiz = async (updatedAnswers: { question: string; answer: string }[]) => {
    const reportPromise = (async () => {
      try {
        const res = await fetch("/api/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sanityQuiz,
            role: role!,
            level: level!,
            answers: updatedAnswers,
            locale: (locale === "cz" ? "ua" : locale) as "en" | "ua" | "ru",
          }),
        });
        const data = await res.json();

        if (!res.ok) {
          console.error("❌ API error:", data);
          return null;
        }

        if (data.usedLayer) {
          console.log(`✅ Report built with university layer ${data.usedLayer}`);
        }

        return data.report || null;
      } catch (e) {
        console.error("❌ Gemini fetch error:", e);
        return null;
      }
    })();

    setReportPromise(reportPromise);

    const quizCompletePayload = {
      step: "Quiz_complete",
      completion_time: Math.round(performance.now() / 1000),
      user_role: role,
      education_level: level,
    };

    trackEvent("Quiz_complete", quizCompletePayload);
    sendEventToServer(quizCompletePayload);

    setStep("form");
  };

  const handleAnswer = async (opt: string | string[]) => {
    if (!current) return;

    const answerValue = Array.isArray(opt) ? opt.join("; ") : opt;

    const updatedAnswers = [
      ...answers,
      { question: current.question, answer: answerValue },
    ];

    setAnswers(updatedAnswers);

    const payload = {
      step: "quiz_step_complete",
      step_number: `${currentIndex + 1}`,
      question_text: current.question,
      answer: answerValue,
    };

    trackEvent("quiz_step_complete", payload);
    await sendEventToServer(payload);

    const skipTarget = current.skipToIndexOnAnswer?.[answerValue];
    const nextIndex =
      typeof skipTarget === "number" ? skipTarget : currentIndex + 1;

    if (nextIndex < questionList.length) {
      setCurrentIndex(nextIndex);
      setInputValue("");
      setSelectedOptions([]);
      return;
    }

    await finishQuiz(updatedAnswers);
  };

  if (!current) return null;

  // Progress: count only remaining path roughly by index over total
  const progressCurrent = Math.min(currentIndex + 1, questionList.length);

  return (
    <div className="quiz-container text-[#153060]">
      <div className="flex justify-center">
        <ProgressBar current={progressCurrent} total={questionList.length} />
      </div>

      <p className="text-sm mb-4">
        {t("progress", {
          current: progressCurrent,
          total: questionList.length,
        })}
      </p>

      <h2 className="text-xl sm:text-2xl font-bold text-left mb-6">
        {current.question}
      </h2>

      {current.type === "multiple-choice" && current.options && (
        <div className="grid grid-cols-1 gap-4">
          {current.options.map((opt: Option, i: number) => (
            <AnswerButton
              key={i}
              className="quiz-option"
              onClick={() => handleAnswer(opt)}
            >
              <span className="mr-2 font-semibold tabular-nums">{i + 1}.</span>
              {opt}
            </AnswerButton>
          ))}
        </div>
      )}

      {current.type === "multi-select" && current.options && (
        <div>
          <p className="text-sm text-[#153060]/80 mb-4 text-left">
            {t("multiSelectHint")}
          </p>
          <div className="grid grid-cols-1 gap-4">
            {current.options.map((opt: Option, i: number) => (
              <AnswerButton
                key={i}
                className="quiz-option"
                selected={selectedOptions.includes(opt)}
                onClick={() => toggleMultiSelectOption(opt)}
              >
                {opt}
              </AnswerButton>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              className="btn btn-primary w-full sm:w-auto"
              disabled={selectedOptions.length === 0}
              onClick={() => handleAnswer(selectedOptions)}
            >
              {t("buttonNext")}
            </Button>
          </div>
        </div>
      )}

      {current.type === "open-ended" && (
        <div>
          <textarea
            className="w-full p-3 border-2 border-[#C3E5F7] rounded-lg text-base resize-y focus:outline-none focus:ring-[#00C0FD] focus:border-[#00C0FD] bg-gray-50"
            rows={4}
            placeholder={t("placeholder")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Button
            className="btn btn-primary w-full sm:w-auto mt-3"
            disabled={inputValue.trim().length < 2}
            onClick={() => handleAnswer(inputValue.trim())}
          >
            {t("buttonNext")}
          </Button>
        </div>
      )}
    </div>
  );
}
