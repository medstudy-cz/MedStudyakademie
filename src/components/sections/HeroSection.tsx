import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
          <div className="max-w-xl md:max-w-none">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              MedStudyacademy z.s.
            </p>
            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 sm:text-xl">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/quiz"
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
              >
                {t("ctaQuiz")}
              </Link>
              <a
                href="#activities"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                {t("ctaServices")}
              </a>
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                {t("ctaContact")}
              </a>
            </div>
          </div>

          <div className="relative hidden w-full md:block">
            <Image
              src="/students.png"
              alt="Medical students and healthcare professionals"
              width={1024}
              height={768}
              priority
              sizes="50vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
