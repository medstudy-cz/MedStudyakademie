"use client";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useQuiz } from "@/features/quiz/context/QuizContext";

export function PersonalizationScreen() {
  const t = useTranslations("PersonalizationScreen");
  const { setStep, setCurrentIndex } = useQuiz();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(0);
      setStep("quiz");
    }, 1000); 

    return () => clearTimeout(timer);
  }, [setStep, setCurrentIndex]);

  return (
    <div className="quiz-container text-center text-[#153060]">
      <div className="loader"></div>
      <p className="font-semibold mt-4">{t("loading")}</p>
    </div>
  );
}
