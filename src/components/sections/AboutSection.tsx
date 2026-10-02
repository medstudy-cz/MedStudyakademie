import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/SectionHeading";

export async function AboutSection() {
  const t = await getTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];
  const fundingParagraphs = t.raw("fundingParagraphs") as string[];

  return (
    <section id="about" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <div id="funding" className="mt-10 max-w-3xl scroll-mt-20">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {t("fundingTitle")}
          </h3>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {fundingParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
