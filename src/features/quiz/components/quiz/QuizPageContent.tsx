"use client";

import { StartScreen } from "@/features/quiz/components/quiz/StartScreen";
import { RoleSelection } from "@/features/quiz/components/quiz/RoleSelection";
import { EducationLevelSelection } from "@/features/quiz/components/quiz/EducationLevelSelection";
import { PersonalizationScreen } from "@/features/quiz/components/quiz/PersonalizationScreen";
import { QuizScreen } from "@/features/quiz/components/quiz/QuizScreen";
import { LeadCaptureForm } from "@/features/quiz/components/quiz/LeadCaptureForm";
import { ThankYouScreen } from "@/features/quiz/components/quiz/ThankYouScreen";
import { useQuiz } from "@/features/quiz/context/QuizContext";
import { trackEvent } from "@/features/quiz/utils/analytics";
import { sendEventToServer } from "@/features/quiz/utils/sendEvent";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import { resolveStartScreenCopy } from "@/features/quiz/utils/resolveStartScreenCopy";
import type { StartScreenCopyKey } from "@/features/quiz/utils/resolveStartScreenCopy";

export function QuizPageContent() {
  const { step, setStep, role, level, setAnswers, answers, sanityQuiz } = useQuiz();
  const t = useTranslations("StartScreen");
  const locale = useLocale() || "ua";
  const startCopy = resolveStartScreenCopy(
    locale,
    sanityQuiz?.startScreen,
    (key: StartScreenCopyKey) => t(key),
  );

  const backgroundClass = clsx(
    "relative flex min-h-full flex-1 flex-col",
    {
      "bg-[#0babff] bg-[url('/quiz/back.png')] bg-no-repeat bg-bottom bg-[length:150%] sm:bg-[length:100%]":
        role === "student",
      "bg-[#ddf7ff]": role === "parent",
      "bg-[#67dcfe]": !role,
    },
  );

  return (
    <div className={backgroundClass}>
      {role === "student" && (
        <div className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-gradient-to-b from-[#0babff] via-[#0babff]/80 to-transparent" />
      )}

      <div className="relative z-10 flex flex-1 flex-col">
        {step === "start" && (
          <div className="relative flex flex-col items-center">
            <h1
              className="relative z-20 mt-8 mb-6 px-4 text-center text-3xl font-bold"
              style={{ color: "#153060" }}
            >
              {startCopy.title}
            </h1>

            <div className="relative flex w-full max-w-md justify-center">
              <div className="absolute top-1/2 z-0 h-[150px] w-[365px] -translate-y-1/2 rounded-full bg-white opacity-60 blur-3xl" />
              <img
                src="/quiz/main.png"
                alt="illustration"
                className="relative z-10 mb-[-5rem] w-[250px]"
              />
            </div>
          </div>
        )}

        <div className="flex flex-1 items-center justify-center px-4 py-8">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-4 text-center shadow-xl sm:p-10">
            {step === "start" && (
              <StartScreen
                copy={startCopy}
                onStart={() => {
                  setStep("role");
                  trackEvent("quiz_view", { step: "Start" });
                  sendEventToServer({ step: "Start" });
                }}
              />
            )}
            {step === "role" && <RoleSelection />}
            {step === "education" && role && <EducationLevelSelection />}
            {step === "personalization" && <PersonalizationScreen />}
            {step === "quiz" && role && level && <QuizScreen />}
            {step === "form" && (
              <LeadCaptureForm
                onSubmit={async (data) => {
                  setAnswers([
                    ...answers,
                    {
                      question: "Form submitted",
                      answer: JSON.stringify(data),
                    },
                  ]);
                  setStep("thankyou");
                }}
              />
            )}
            {step === "thankyou" && <ThankYouScreen />}
          </div>
        </div>
      </div>
    </div>
  );
}
