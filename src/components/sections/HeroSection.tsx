"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import {
  staggerContainer,
  staggerItem,
  scaleIn,
  slideInRight,
  smoothEase,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white">
      <motion.div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-xl md:max-w-none"
          >
            <motion.p
              variants={staggerItem}
              className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary"
            >
              MedStudyakademie z.s.
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              {t("title")}
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="mt-5 text-lg leading-relaxed text-slate-600 sm:text-xl"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <motion.a
                href="#activities"
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: smoothEase }}
              >
                {t("ctaServices")}
              </motion.a>
              <motion.a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto",
                )}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: smoothEase }}
              >
                {t("ctaContact")}
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            custom={0.2}
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden w-full md:block"
          >
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={0.35}
              className="w-full"
            >
              <Image
                src="/students.png"
                alt="Medical students and healthcare professionals"
                width={1024}
                height={768}
                priority
                sizes="50vw"
                className="h-auto w-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
