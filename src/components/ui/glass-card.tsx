"use client";

import { HTMLMotionProps, motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, MouseEvent } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  variant?: "default" | "panel" | "hover";
  noPadding?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = "default",
  noPadding = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-xl border transition-all duration-300 group overflow-hidden",
        {
          "glass": variant === "default",
          "glass-panel": variant === "panel",
          "glass glass-hover": variant === "hover",
          "p-6": !noPadding,
        },
        className
      )}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
