import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/SectionHeading";

export async function AboutSection() {
  const t = await getTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section id="about" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
