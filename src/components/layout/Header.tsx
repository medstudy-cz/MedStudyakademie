"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { buttonVariants } from "@/components/ui/button";
import { smoothEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", key: "about" as const },
  { href: "#activities", key: "activities" as const },
  { href: "#audience", key: "audience" as const },
  { href: "#contact", key: "contact" as const },
];

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: smoothEase }}
        className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Logo className="shrink-0" />

          <nav
            className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex"
            aria-label="Main"
          >
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="transition-colors duration-300 hover:text-primary"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <a href="#contact" className={buttonVariants({ size: "sm" })}>
              {t("contactUs")}
            </a>
          </div>

          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-slate-700 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: smoothEase }}
            className="fixed inset-0 z-[60] flex flex-col bg-white md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <Logo className="shrink-0" />
              <button
                type="button"
                className="rounded-lg p-2 text-slate-700"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: smoothEase, delay: 0.05 }}
              className="flex flex-1 flex-col justify-center gap-2 px-6"
              aria-label="Mobile"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: smoothEase,
                    delay: 0.08 + index * 0.06,
                  }}
                  className="rounded-xl px-4 py-4 text-xl font-semibold text-slate-800 transition-colors hover:bg-sky-50 hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {t(item.key)}
                </motion.a>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: smoothEase, delay: 0.1 }}
              className="space-y-4 border-t border-slate-100 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              <LanguageSwitcher
                variant="inline"
                className="w-full"
                onLocaleChange={() => setOpen(false)}
              />
              <a
                href="#contact"
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
                onClick={() => setOpen(false)}
              >
                {t("contactUs")}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
