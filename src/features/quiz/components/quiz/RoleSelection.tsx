"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { useQuiz } from "@/features/quiz/context/QuizContext";
import { trackEvent } from "@/features/quiz/utils/analytics";
import { sendEventToServer } from "@/features/quiz/utils/sendEvent";

export function RoleSelection() {
  const t = useTranslations("RoleSelection");
  const { questions, setRole, setLevel, setStep, loading, error } = useQuiz();

  if (loading) return <p>Loading...</p>;
  if (error || !questions) return <p>Error loading questions</p>;

  const roles = Object.keys(questions) as (keyof typeof questions)[];

  const handleSelect = (role: string) => {
    setRole(role);

    const roleBank = (
      questions as unknown as Record<string, Record<string, unknown[]>>
    )[role];
    const levels = Object.keys(roleBank || {}).filter(
      (key) => Array.isArray(roleBank[key]) && roleBank[key].length > 0,
    );

    // Новый банк: один набор вопросов на роль (all) — без экрана уровня образования
    if (levels.length === 1 && levels[0] === "all") {
      setLevel("all");
      setStep("personalization");

      const payload = {
        step: "Quiz_start",
        user_role: role,
        education_level: "all",
      };
      trackEvent("Quiz_start", payload);
      sendEventToServer(payload);
      return;
    }

    setStep("education");
  };

  return (
    <div className="quiz-container mt-10 mb-10 text-[#153060]">
      <h2 className="mb-6 text-[22px] font-bold">{t("title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => handleSelect(role)}
            className="quiz-option text-center p-6 border-2 rounded-[16px] bg-white transition-colors 
                   border-[#C3E5F7] hover:border-[#1BACFE] hover:bg-[#EDF9FF] text-base"
          >
            <img
              src={
                role === "student"
                  ? "/quiz/studentIcon.png"
                  : "/quiz/parentsIcon.png"
              }
              alt={`${role} icon`}
              className="w-12 h-auto mx-auto"
            />
            <span className="block mt-2 font-bold text-[20px]">{t(role)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
