import { v4 as uuidv4 } from "uuid";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

type QueuedEvent = { name: string; params: Record<string, any> };

const eventQueue: QueuedEvent[] = [];

let sessionId: string | null = null;

export function getSessionId(): string {
  if (!sessionId) {
    sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("sessionId", sessionId);
    }
  }
  return sessionId;
}

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach(
    (k) => {
      const v = params.get(k);
      if (v) utm[k] = v;
    }
  );
  return utm;
}

export function trackEvent(event: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    session_id: getSessionId(),
    ...getUtmParams(),
    ...params,
  };

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", event, payload);
    } catch (e) {
      console.warn("gtag send error", e);
    }
  } else {
    console.warn("gtag not loaded yet:", event, params);
    eventQueue.push({ name: event, params: payload });
  }
}

export function flushEventQueue() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  while (eventQueue.length) {
    const ev = eventQueue.shift()!;
    try {
      window.gtag("event", ev.name, ev.params);
    } catch (e) {
      console.warn("gtag send error", e);
    }
  }
}

// слушаем сигнал о готовности gtag
if (typeof window !== "undefined") {
  window.addEventListener("ga:gtagLoaded", () => {
    // даём немного времени, чтобы gtag точно доступен
    setTimeout(() => flushEventQueue(), 0);
  });

  // если gtag уже есть (редко), пробуем сбросить через секунду
  setTimeout(() => {
    if (typeof window.gtag === "function") flushEventQueue();
  }, 1000);
}
