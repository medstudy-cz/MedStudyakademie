"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { smoothEase } from "@/lib/motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
};

const directionOffset = {
  up: { y: 32, x: 0, scale: 1 },
  down: { y: -32, x: 0, scale: 1 },
  left: { y: 0, x: -32, scale: 1 },
  right: { y: 0, x: 32, scale: 1 },
  scale: { y: 0, x: 0, scale: 0.94 },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const offset = directionOffset[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset.y, x: offset.x, scale: offset.scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: smoothEase, delay }}
    >
      {children}
    </motion.div>
  );
}
