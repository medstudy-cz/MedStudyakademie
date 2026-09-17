const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_VERSION = "v1beta";
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_FALLBACK_MODEL = "gemini-2.0-flash";

function modelUrl(model: string) {
  return `https://generativelanguage.googleapis.com/${GEMINI_API_VERSION}/models/${model}:generateContent`;
}

function cleanHtml(html: string) {
  return html
    .replace(/^```html\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

function hasMarkdownMarkup(text: string): boolean {
  return /^#{1,3}\s/m.test(text) || /\*\*[^*]+\*\*/.test(text);
}

function convertMarkdownBody(cleaned: string): string {
  const lines = cleaned.split(/\r?\n/);
  const parts: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      parts.push("</ul>");
      inList = false;
    }
  };

  const inline = (text: string) =>
    text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.+?)__/g, "<strong>$1</strong>");

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      closeList();
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length + 1, 3);
      parts.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }

    const bullet = /^[-*•]\s+(.+)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.+)$/.exec(line);
    if (bullet || numbered) {
      if (!inList) {
        parts.push("<ul>");
        inList = true;
      }
      parts.push(`<li>${inline((bullet || numbered)![1])}</li>`);
      continue;
    }

    closeList();
    parts.push(`<p>${inline(line)}</p>`);
  }
  closeList();

  return `<div style="font-family:sans-serif;color:#153060;line-height:1.6;">${parts.join("\n")}</div>`;
}

/** Fallback: модель иногда отдаёт Markdown — конвертируем в простой HTML для письма. */
export function markdownishToHtml(input: string): string {
  const cleaned = cleanHtml(input);
  if (!hasMarkdownMarkup(cleaned)) {
    return cleaned;
  }

  // Preserve trailing HTML CTA blocks the model may already have appended
  const htmlBlockStart = cleaned.search(/<(div|table)\b/i);
  if (htmlBlockStart > 0) {
    const mdPart = cleaned.slice(0, htmlBlockStart).trim();
    const htmlPart = cleaned.slice(htmlBlockStart).trim();
    return `${convertMarkdownBody(mdPart)}\n${htmlPart}`;
  }

  return convertMarkdownBody(cleaned);
}

/** Layer 1 asked for broader catalog instead of HTML report */
export function needsBroaderCatalog(text: string | null | undefined): boolean {
  if (!text) return true;
  const normalized = text.replace(/[`"'«»]/g, "").trim();
  return (
    /NEED_BROADER_CATALOG/i.test(normalized) &&
    !/<h[1-6]|<p|<div/i.test(normalized)
  );
}

async function generateWithModel(prompt: string, model: string) {
  const payload = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.4,
    },
  };

  const res = await fetch(modelUrl(model), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-goog-api-key": GEMINI_API_KEY as string,
    },
    body: JSON.stringify(payload),
  });

  const rawText = await res.text();
  const data = JSON.parse(rawText);

  if (!res.ok) {
    throw new Error(`Gemini API error ${res.status}: ${JSON.stringify(data)}`);
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return markdownishToHtml(text);
}

export async function generateReport(prompt: string) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  try {
    return await generateWithModel(prompt, GEMINI_MODEL);
  } catch (err) {
    console.warn(
      `[Gemini] ${GEMINI_MODEL} failed, retrying with ${GEMINI_FALLBACK_MODEL}`,
      err,
    );
    return await generateWithModel(prompt, GEMINI_FALLBACK_MODEL);
  }
}
