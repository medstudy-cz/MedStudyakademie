// utils/getUTMParams.ts
export type UTMArguments = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
};

export function getUTMParams(): UTMArguments {
  if (typeof window === "undefined") {
    return { source: "", medium: "", campaign: "", content: "", term: "" };
  }

  const urlParams = new URLSearchParams(window.location.search);

  return {
    source: urlParams.get("utm_source") || "",
    medium: urlParams.get("utm_medium") || "",
    campaign: urlParams.get("utm_campaign") || "",
    content: urlParams.get("utm_content") || "",
    term: urlParams.get("utm_term") || "",
  };
}
