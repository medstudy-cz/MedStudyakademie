import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function PartnersSection() {
  const t = await getTranslations("partners");

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading title={t("title")} className="text-center" />
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            {t("text")}
          </p>
          <a
            href="#contact"
            className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex")}
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
