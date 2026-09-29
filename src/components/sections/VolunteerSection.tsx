import { getTranslations } from "next-intl/server";
import { HeartHandshake } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function VolunteerSection() {
  const t = await getTranslations("volunteer");

  return (
    <section
      id="volunteer"
      className="scroll-mt-20 border-y border-sky-100 bg-gradient-to-r from-sky-50 to-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <HeartHandshake className="h-8 w-8" aria-hidden />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {t("title")}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {t("text")}
            </p>
          </div>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "shrink-0",
            )}
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
