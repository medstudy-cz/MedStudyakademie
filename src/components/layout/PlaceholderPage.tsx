import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { FileText } from "lucide-react";

type PlaceholderPageProps = {
  namespace: "placeholders.privacy" | "placeholders.reports";
};

export function PlaceholderPage({ namespace }: PlaceholderPageProps) {
  const t = useTranslations(namespace);

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-8 text-center sm:p-12">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FileText className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          {t("body")}
        </p>
        <Link href="/" className={buttonVariants({ className: "mt-8" })}>
          {t("back")}
        </Link>
      </div>
    </section>
  );
}
