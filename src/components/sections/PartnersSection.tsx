"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { smoothEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function PartnersSection() {
  const t = useTranslations("partners");

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="scale">
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading title={t("title")} className="text-center" />
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              {t("text")}
            </p>
            <motion.a
              href="#contact"
              className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: smoothEase }}
            >
              {t("cta")}
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
