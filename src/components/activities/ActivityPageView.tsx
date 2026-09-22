"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { buttonVariants } from "@/components/ui/button";
import { smoothEase, staggerContainer, staggerItem } from "@/lib/motion";
import type { ActivitySlug } from "@/lib/activity-slugs";
import { cn } from "@/lib/utils";

type TextCard = { title: string; description: string };
type ProgramCard = {
  title: string;
  format: string;
  duration: string;
  intensity: string;
  groupSize: string;
  price: string;
  cta: string;
};
type TimelineStep = { title: string; description: string };
type FaqItem = { question: string; answer: string };
type EventCard = {
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  cta: string;
};
type StoryCard = { name: string; role: string; quote: string };
type MetaRow = { label: string; value: string };

type ActivityPageViewProps = {
  slug: ActivitySlug;
};

export function ActivityPageView({ slug }: ActivityPageViewProps) {
  const t = useTranslations("activityPages");
  const page = useTranslations(`activityPages.${slug}`);

  const purpose = page.has("purpose") ? page("purpose") : null;
  const categories = page.has("categories")
    ? (page.raw("categories") as { title: string; items: TextCard[] })
    : null;
  const programs = page.has("programs")
    ? (page.raw("programs") as { title: string; items: ProgramCard[] })
    : null;
  const advantages = page.has("advantages")
    ? (page.raw("advantages") as { title: string; items: string[] })
    : null;
  const timeline = page.has("timeline")
    ? (page.raw("timeline") as { title: string; items: TimelineStep[] })
    : null;
  const packages = page.has("packages")
    ? (page.raw("packages") as { title: string; items: TextCard[] })
    : null;
  const stories = page.has("stories")
    ? (page.raw("stories") as { title: string; items: StoryCard[] })
    : null;
  const eventTypes = page.has("eventTypes")
    ? (page.raw("eventTypes") as { title: string; items: TextCard[] })
    : null;
  const events = page.has("events")
    ? (page.raw("events") as { title: string; items: EventCard[] })
    : null;
  const archive = page.has("archive")
    ? (page.raw("archive") as { title: string; text: string })
    : null;
  const volunteerBlock = page.has("volunteerBlock")
    ? (page.raw("volunteerBlock") as {
        title: string;
        text: string;
        cta: string;
      })
    : null;
  const directions = page.has("directions")
    ? (page.raw("directions") as { title: string; items: TextCard[] })
    : null;
  const formats = page.has("formats")
    ? (page.raw("formats") as { title: string; items: MetaRow[] })
    : null;
  const audiences = page.has("audiences")
    ? (page.raw("audiences") as { title: string; items: TextCard[] })
    : null;
  const helpAreas = page.has("helpAreas")
    ? (page.raw("helpAreas") as { title: string; items: TextCard[] })
    : null;
  const knowledge = page.has("knowledge")
    ? (page.raw("knowledge") as { title: string; items: string[] })
    : null;
  const faq = page.has("faq")
    ? (page.raw("faq") as { title: string; items: FaqItem[] })
    : null;
  const formTitle = page.has("formTitle") ? page("formTitle") : null;
  const formSubject = page.has("formSubject") ? page("formSubject") : undefined;
  const partnerEmail = page.has("partnerEmail") ? page("partnerEmail") : null;
  const messengerCta = page.has("messengerCta")
    ? (page.raw("messengerCta") as { title: string; text: string; cta: string })
    : null;

  return (
    <article>
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <Link
            href="/#activities"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t("back")}
          </Link>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              variants={staggerItem}
              className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary"
            >
              MedStudyacademy z.s.
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              {page("hero.title")}
            </motion.h1>
            {page.has("hero.subtitle") && (
              <motion.p
                variants={staggerItem}
                className="mt-5 text-lg leading-relaxed text-slate-600 sm:text-xl"
              >
                {page("hero.subtitle")}
              </motion.p>
            )}
            <motion.div variants={staggerItem} className="mt-8">
              <a
                href="#activity-form"
                className={buttonVariants({ size: "lg" })}
              >
                {page("hero.cta")}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {purpose && (
        <SectionShell>
          <ScrollReveal>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {purpose}
            </p>
          </ScrollReveal>
        </SectionShell>
      )}

      {categories && (
        <CardGridSection title={categories.title} items={categories.items} />
      )}

      {programs && (
        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading title={programs.title} />
            </ScrollReveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {programs.items.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 0.08}>
                  <motion.article
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: smoothEase }}
                    className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:border-sky-100 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <dl className="mt-4 flex-1 space-y-2 text-sm text-slate-600">
                      <MetaLine icon={Users} label={item.format} />
                      <MetaLine icon={Clock} label={item.duration} />
                      <p>{item.intensity}</p>
                      <p>{item.groupSize}</p>
                      <p className="font-semibold text-primary">{item.price}</p>
                    </dl>
                    <a
                      href="#activity-form"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "mt-5 w-full",
                      )}
                    >
                      {item.cta}
                    </a>
                  </motion.article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {advantages && (
        <SectionShell tone="white">
          <ScrollReveal>
            <SectionHeading title={advantages.title} />
          </ScrollReveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {advantages.items.map((item, index) => (
              <ScrollReveal key={item} delay={index * 0.06}>
                <li className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden
                  />
                  {item}
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </SectionShell>
      )}

      {timeline && (
        <SectionShell tone="slate">
          <ScrollReveal>
            <SectionHeading title={timeline.title} />
          </ScrollReveal>
          <ol className="mt-10 space-y-5">
            {timeline.items.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.08}>
                <li className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </SectionShell>
      )}

      {packages && (
        <CardGridSection title={packages.title} items={packages.items} />
      )}

      {stories && (
        <SectionShell tone="slate">
          <ScrollReveal>
            <SectionHeading title={stories.title} />
          </ScrollReveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {stories.items.map((story, index) => (
              <ScrollReveal key={story.name} delay={index * 0.08}>
                <blockquote className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <p className="flex-1 text-sm leading-relaxed text-slate-600">
                    “{story.quote}”
                  </p>
                  <footer className="mt-4 border-t border-slate-100 pt-4">
                    <p className="font-semibold text-slate-900">{story.name}</p>
                    <p className="text-sm text-slate-500">{story.role}</p>
                  </footer>
                </blockquote>
              </ScrollReveal>
            ))}
          </div>
        </SectionShell>
      )}

      {eventTypes && (
        <CardGridSection title={eventTypes.title} items={eventTypes.items} />
      )}

      {events && (
        <SectionShell tone="slate">
          <ScrollReveal>
            <SectionHeading title={events.title} />
          </ScrollReveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.items.map((event, index) => (
              <ScrollReveal key={event.title} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: smoothEase }}
                  className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {event.title}
                  </h3>
                  <dl className="mt-4 flex-1 space-y-2 text-sm text-slate-600">
                    <MetaLine icon={Clock} label={`${event.date} · ${event.time}`} />
                    <MetaLine icon={MapPin} label={event.location} />
                    <p className="font-semibold text-primary">{event.price}</p>
                  </dl>
                  <a
                    href="#activity-form"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "mt-5 w-full",
                    )}
                  >
                    {event.cta}
                  </a>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </SectionShell>
      )}

      {archive && (
        <SectionShell tone="white">
          <ScrollReveal>
            <SectionHeading title={archive.title} />
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
              {archive.text}
            </p>
          </ScrollReveal>
        </SectionShell>
      )}

      {volunteerBlock && (
        <SectionShell tone="slate">
          <ScrollReveal>
            <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-8 sm:p-10">
              <SectionHeading title={volunteerBlock.title} />
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                {volunteerBlock.text}
              </p>
              <a
                href="#activity-form"
                className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex")}
              >
                {volunteerBlock.cta}
              </a>
            </div>
          </ScrollReveal>
        </SectionShell>
      )}

      {directions && (
        <CardGridSection title={directions.title} items={directions.items} />
      )}

      {formats && (
        <SectionShell tone="slate">
          <ScrollReveal>
            <SectionHeading title={formats.title} />
          </ScrollReveal>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {formats.items.map((row, index) => (
              <ScrollReveal key={row.label} delay={index * 0.06}>
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {row.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-700">
                    {row.value}
                  </dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </SectionShell>
      )}

      {audiences && (
        <CardGridSection title={audiences.title} items={audiences.items} />
      )}

      {helpAreas && (
        <CardGridSection title={helpAreas.title} items={helpAreas.items} />
      )}

      {knowledge && (
        <SectionShell tone="slate">
          <ScrollReveal>
            <SectionHeading title={knowledge.title} />
          </ScrollReveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {knowledge.items.map((item, index) => (
              <ScrollReveal key={item} delay={index * 0.05}>
                <li className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-sm text-slate-700 shadow-sm">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden
                  />
                  {item}
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </SectionShell>
      )}

      {faq && (
        <SectionShell tone="white">
          <ScrollReveal>
            <SectionHeading title={faq.title} />
          </ScrollReveal>
          <div className="mt-8 space-y-3">
            {faq.items.map((item, index) => (
              <ScrollReveal key={item.question} delay={index * 0.05}>
                <details className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 open:bg-white open:shadow-sm">
                  <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      {item.question}
                      <span className="text-primary transition-transform group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.answer}
                  </p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </SectionShell>
      )}

      {messengerCta && (
        <SectionShell tone="slate">
          <ScrollReveal>
            <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-8 sm:p-10">
              <SectionHeading title={messengerCta.title} />
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                {messengerCta.text}
              </p>
              <a
                href="#activity-form"
                className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex")}
              >
                {messengerCta.cta}
              </a>
            </div>
          </ScrollReveal>
        </SectionShell>
      )}

      {(formTitle || partnerEmail) && (
        <section
          id="activity-form"
          className="scroll-mt-20 bg-white py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              {formTitle && <SectionHeading title={formTitle} />}
              {partnerEmail && (
                <p className="mt-4 text-base text-slate-600">
                  <a
                    href={`mailto:${partnerEmail}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {partnerEmail}
                  </a>
                </p>
              )}
            </ScrollReveal>
            <div className="mt-8 max-w-xl">
              <ScrollReveal delay={0.05}>
                <Suspense fallback={null}>
                  <ContactForm defaultSubject={formSubject} />
                </Suspense>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function SectionShell({
  children,
  tone = "white",
}: {
  children: React.ReactNode;
  tone?: "white" | "slate";
}) {
  return (
    <section
      className={cn(
        "py-16 sm:py-20",
        tone === "slate" ? "bg-slate-50" : "bg-white",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function CardGridSection({
  title,
  items,
}: {
  title: string;
  items: TextCard[];
}) {
  return (
    <SectionShell tone="slate">
      <ScrollReveal>
        <SectionHeading title={title} />
      </ScrollReveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <ScrollReveal key={item.title} delay={index * 0.08}>
            <motion.article
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:border-sky-100 hover:shadow-lg hover:shadow-primary/5"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </motion.article>
          </ScrollReveal>
        ))}
      </div>
    </SectionShell>
  );
}

function MetaLine({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
      <span>{label}</span>
    </div>
  );
}
