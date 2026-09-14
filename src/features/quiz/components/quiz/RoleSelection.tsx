"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { useQuiz } from "@/features/quiz/context/QuizContext";

export function RoleSelection() {
  const t = useTranslations("RoleSelection");
  const { questions, setRole, setStep, loading, error } = useQuiz();

  if (loading) return <p>Loading...</p>;
  if (error || !questions) return <p>Error loading questions</p>;

  const roles = Object.keys(questions) as (keyof typeof questions)[];

  const handleSelect = (role: string) => {
    setRole(role);
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
          src={role as string === "student" ? "/quiz/studentIcon.png" : "/quiz/parentsIcon.png"}
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
