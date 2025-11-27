"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export default function MultiRangeSlider({
  className,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  ...props
}) {
  // Ensure we always have exactly 2 values for range slider (min and max)
  const [localValue, setLocalValue] = React.useState(value || [min, max]);

  // Sync local value with the prop value if it changes externally
  React.useEffect(() => {
    if (value) setLocalValue(value);
  }, [value]);

  const handleValueChange = (newValues) => {
    if (newValues.length === 2) {
      const [minVal, maxVal] = newValues;

      // Apply constraints
      const constrainedMin = Math.max(min, Math.min(minVal, maxVal - step));
      const constrainedMax = Math.min(
        max,
        Math.max(maxVal, constrainedMin + step)
      );

      // Update local value
      setLocalValue([constrainedMin, constrainedMax]);

      // Call onValueChange if provided (to propagate the new value)
      if (onValueChange) {
        onValueChange([constrainedMin, constrainedMax]);
      }
    }
  };

  return (
    <SliderPrimitive.Root
      value={localValue}
      onValueChange={handleValueChange}
      min={min}
      max={max}
      step={step}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="bg-muted relative h-2 w-full grow overflow-hidden rounded-full">
        <SliderPrimitive.Range className="bg-primary absolute h-full" />
      </SliderPrimitive.Track>

      {/* Min Thumb */}
      <SliderPrimitive.Thumb className="block size-4 shrink-0 rounded-full border border-primary bg-background ring-ring/50 shadow-sm transition-colors focus-visible:ring-4 focus-visible:outline-none hover:bg-accent cursor-grab active:cursor-grabbing" />

      {/* Max Thumb */}
      <SliderPrimitive.Thumb className="block size-4 shrink-0 rounded-full border border-primary bg-background ring-ring/50 shadow-sm transition-colors focus-visible:ring-4 focus-visible:outline-none hover:bg-accent cursor-grab active:cursor-grabbing" />
    </SliderPrimitive.Root>
  );
}
