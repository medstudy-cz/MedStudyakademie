"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { smoothEase, staggerContainer, staggerItem } from "@/lib/motion";

type StatItem = {
  value: string;
  label: string;
};

export function StatsSection() {
  const t = useTranslations("stats");
  const items = t.raw("items") as StatItem[];

  return (
    <section className="bg-primary py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="scale">
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6"
          >
            {items.map((item) => (
              <motion.li
                key={item.label}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.35, ease: smoothEase }}
                className="text-center"
              >
                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-sky-100 sm:text-base">
                  {item.label}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
