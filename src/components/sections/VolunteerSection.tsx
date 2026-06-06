"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { buttonVariants } from "@/components/ui/button";
import { smoothEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function VolunteerSection() {
  const t = useTranslations("volunteer");

  return (
    <section className="border-y border-sky-100 bg-gradient-to-r from-sky-50 to-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="left">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <motion.div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <HeartHandshake className="h-8 w-8" aria-hidden />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {t("title")}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {t("text")}
              </p>
            </div>
            <motion.a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "shrink-0",
              )}
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
