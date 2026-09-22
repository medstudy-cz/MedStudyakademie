"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  BookOpen,
  Stethoscope,
  Users,
  MessageCircle,
  Handshake,
  LifeBuoy,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ACTIVITY_SLUG_BY_INDEX } from "@/lib/activity-slugs";
import { smoothEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ActivityItem = {
  title: string;
  description: string;
};

const activityIcons: LucideIcon[] = [
  BookOpen,
  Stethoscope,
  Users,
  MessageCircle,
  Handshake,
  LifeBuoy,
];

export function ActivitiesSection() {
  const t = useTranslations("activities");
  const items = t.raw("items") as ActivityItem[];

  return (
    <section
      id="activities"
      className="scroll-mt-20 bg-slate-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading title={t("title")} />
        </ScrollReveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item, index) => {
            const Icon = activityIcons[index] ?? BookOpen;
            const slug = ACTIVITY_SLUG_BY_INDEX[index];

            return (
              <ScrollReveal key={item.title} delay={index * 0.08}>
                <Link href={`/activities/${slug}`} className="block h-full">
                  <motion.article
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: smoothEase }}
                    className={cn(
                      "flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm",
                      "hover:border-sky-100 hover:shadow-lg hover:shadow-primary/5",
                    )}
                  >
                    <motion.div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                      transition={{ duration: 0.5, ease: smoothEase }}
                    >
                      <Icon className="h-6 w-6" aria-hidden />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {t("learnMore")}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </motion.article>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
