"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RadioGroupContextValue = {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

function RadioGroup({
  className,
  value,
  onValueChange,
  name,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const generatedName = React.useId();

  return (
    <RadioGroupContext.Provider
      value={{ value, onValueChange, name: name ?? generatedName }}
    >
      <div
        role="radiogroup"
        className={cn("grid gap-3", className)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

function RadioGroupItem({
  className,
  value,
  id,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "name" | "value"> & {
  value: string;
}) {
  const group = React.useContext(RadioGroupContext);
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <input
      id={inputId}
      type="radio"
      name={group.name}
      checked={group.value === value}
      onChange={() => group.onValueChange?.(value)}
      value={value}
      className={cn(
        "size-4 border border-[var(--border-medium)] text-[var(--color-brand)] accent-[var(--color-brand)]",
        className,
      )}
      {...props}
    />
  );
}

export { RadioGroup, RadioGroupItem };
