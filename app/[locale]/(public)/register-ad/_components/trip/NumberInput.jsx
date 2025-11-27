"use client";

import React from "react";
import { Controller } from "react-hook-form";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"; // adjust path based on your setup
import { cn } from "@/lib/utils"; // optional utility if you use it

// --- helpers --- //
function formatNumber(value, farsiDigits = false) {
  if (value === null || value === undefined || value === "") return "";
  const str = value.toString().replace(/\D/g, "");
  const withCommas = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!farsiDigits) return withCommas;

  // convert English digits → Persian digits
  const persianDigits = withCommas.replace(
    /\d/g,
    (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]
  );
  return persianDigits;
}

export default function NumberInput({
  name,
  control,
  placeholder = "",
  farsiDigits = false,
  prefix,
  suffix,
  className,
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field } }) => (
        <InputGroup className={cn("w-full", className)}>
          {prefix && <InputGroupAddon>{prefix}</InputGroupAddon>}

          <InputGroupInput
            {...field}
            {...props}
            value={formatNumber(value, farsiDigits)}
            onChange={(e) => {
              const raw = e.target.value
                // Convert Persian digits → English
                .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
                .replace(/,/g, ""); // remove commas

              if (/^\d*$/.test(raw)) {
                onChange(raw);
              }
            }}
            inputMode="numeric"
            placeholder={placeholder}
            className="rtl:text-right rtl:placeholder:text-right py-5 px-4"
          />

          {suffix && <InputGroupAddon>{suffix}</InputGroupAddon>}
        </InputGroup>
      )}
    />
  );
}
