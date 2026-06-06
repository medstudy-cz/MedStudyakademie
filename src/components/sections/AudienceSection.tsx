"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap, Stethoscope, Globe2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { smoothEase } from "@/lib/motion";

type AudienceGroup = {
  title: string;
  description: string;
};

const groupIcons: LucideIcon[] = [GraduationCap, Stethoscope, Globe2];

export function AudienceSection() {
  const t = useTranslations("audience");
  const groups = t.raw("groups") as AudienceGroup[];

  return (
    <section id="audience" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading title={t("title")} />
        </ScrollReveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {groups.map((group, index) => {
            const Icon = groupIcons[index] ?? Globe2;

            return (
              <ScrollReveal
                key={group.title}
                delay={index * 0.1}
                direction={index === 1 ? "scale" : "up"}
              >
                <motion.article
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: smoothEase }}
                  className="flex h-full flex-col rounded-2xl border border-primary/15 bg-sky-50/50 p-6 transition-shadow hover:shadow-md hover:shadow-primary/10"
                >
                  <motion.div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: smoothEase }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {group.description}
                  </p>
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
