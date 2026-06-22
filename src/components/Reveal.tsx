"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** seconds */
  delay?: number;
  /** translate-up distance in px */
  y?: number;
  as?: "div" | "span" | "li";
};

// Premium ease-out — quiet, never bouncy.
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-triggered reveal: fade + subtle translate-up, once.
 * Respects prefers-reduced-motion by rendering content statically.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
