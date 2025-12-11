"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  // Deprecated/unused props from old version kept optional for safety if needed elsewhere (though verified unused)
  label?: string; 
  unit?: string;
}

export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  ...props
}: SliderProps) {
  const currentValue = value[0] ?? min;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onValueChange([newValue]);
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
      <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-zinc-800">
        <div 
           className="absolute h-full bg-fuchsia-600" 
           style={{ width: `${percentage}%` }}
        />
      </div>
      <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={currentValue}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div 
        className="block h-5 w-5 rounded-full border-2 border-fuchsia-500 bg-black ring-offset-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 pointer-events-none absolute"
        style={{ left: `calc(${percentage}% - 10px)` }}
      />
    </div>
  );
}
