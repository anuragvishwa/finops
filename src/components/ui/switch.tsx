"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    return (
      <label className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-50",
          props.checked ? "bg-fuchsia-600" : "bg-zinc-700",
          className
      )}>
        <input 
          type="checkbox" 
          className="sr-only" 
          ref={ref} 
          {...props} 
          onChange={(e) => {
             props.onChange?.(e);
             onCheckedChange?.(e.target.checked);
          }}
        />
      <motion.span
        layout
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
          props.checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </label>
  );
});
Switch.displayName = "Switch";

export { Switch };
