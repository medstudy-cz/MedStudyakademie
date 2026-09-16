"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { useQuiz } from "@/features/quiz/context/QuizContext";

function isQuizPath(pathname: string): boolean {
  return /\/quiz(\/|$)/.test(pathname);
}

function resolveHref(anchor: HTMLAnchorElement): string | null {
  const href = anchor.getAttribute("href");
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return null;
  }
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) {
      return url.href;
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return href;
  }
}

/**
 * Если квиз уже начат — перехват внутренних ссылок сайта с подтверждением.
 */
export function QuizLeaveGuard() {
  const { step } = useQuiz();
  const t = useTranslations("QuizLeaveGuard");
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  /** После «Да, перейти» — не показывать нативный beforeunload */
  const allowLeaveRef = useRef(false);
  const onBeforeUnloadRef = useRef<((event: BeforeUnloadEvent) => void) | null>(
    null,
  );

  const inProgress = step !== "start" && step !== "thankyou";

  const navigateTo = useCallback((href: string) => {
    allowLeaveRef.current = true;
    const handler = onBeforeUnloadRef.current;
    if (handler) {
      window.removeEventListener("beforeunload", handler);
      onBeforeUnloadRef.current = null;
    }
    setPendingHref(null);
    window.location.assign(href);
  }, []);

  useEffect(() => {
    if (!inProgress) return;

    const onClick = (event: MouseEvent) => {
      if (allowLeaveRef.current) return;
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;

      const href = resolveHref(anchor);
      if (!href) return;

      let pathname = href;
      try {
        pathname = new URL(href, window.location.origin).pathname;
      } catch {
        /* keep href */
      }

      if (isQuizPath(pathname)) return;

      event.preventDefault();
      event.stopPropagation();
      setPendingHref(href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [inProgress]);

  useEffect(() => {
    if (!inProgress) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (allowLeaveRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    };
    onBeforeUnloadRef.current = onBeforeUnload;
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      if (onBeforeUnloadRef.current === onBeforeUnload) {
        onBeforeUnloadRef.current = null;
      }
    };
  }, [inProgress]);

  if (!pendingHref) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-leave-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-[#153060]">
        <h2 id="quiz-leave-title" className="mb-2 text-lg font-bold">
          {t("title")}
        </h2>
        <p className="mb-6 text-sm leading-relaxed">{t("message")}</p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-xl border border-[#C3E5F7] px-4 py-2.5 text-sm font-semibold hover:bg-sky-50"
            onClick={() => setPendingHref(null)}
          >
            {t("cancel")}
          </button>
          <button
            type="button"
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
            onClick={() => navigateTo(pendingHref)}
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
