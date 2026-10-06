import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Mid-page CTA band — contact first, quiz secondary. */
export async function HomeCtaBand() {
  const t = await getTranslations("homeCta");

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              {t("primary")}
            </a>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto",
              )}
            >
              {t("secondary")}
            </Link>
            <Link
              href="/quiz"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto",
              )}
            >
              {t("quiz")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
