"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  unit?: string;
}

export function Slider({
  label,
  min,
  max,
  step = 1,
  defaultValue = min,
  onChange,
  unit = ""
}: SliderProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <label className="text-slate-300 font-medium">{label}</label>
        <span className="text-fuchsia-400 font-bold bg-fuchsia-400/10 px-2 py-0.5 rounded">
           {value}{unit}
        </span>
      </div>
      <div className="relative w-full h-2 rounded-full bg-slate-800">
        <div 
           className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-fuchsia-600 to-rose-500"
           style={{ width: `${percentage}%` }}
        />
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {/* Thumb pseudo-element styling custom is hard in raw generic CSS without plugin, 
            so we trust standard browser interaction on transparent input over visible track */}
        <div 
            className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white border-2 border-fuchsia-500 shadow-lg pointer-events-none"
            style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  );
}
