"use client";

import React from "react";
import { voiceCategories, voiceOptions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { VoiceSelectorProps } from "@/types";

const voiceGroupLabels: Record<keyof typeof voiceCategories, string> = {
  male: "Male Voices",
  female: "Female Voices",
};

const VoiceSelector = ({ value, onChange, disabled }: VoiceSelectorProps) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="space-y-6 font-sans"
    >
      {(
        Object.keys(voiceCategories) as Array<keyof typeof voiceCategories>
      ).map((category) => (
        <div key={category} className="space-y-4">
          <p className=" text-base text-(--text-secondary)">
            {voiceGroupLabels[category]}
          </p>
          <div
            className={cn(
              "grid gap-4",
              category === "male" ? "md:grid-cols-3" : "md:grid-cols-2",
            )}
          >
            {voiceCategories[category].map((voiceKey) => {
              const voice = voiceOptions[voiceKey];
              const isSelected = value === voiceKey;

              return (
                <Label
                  key={voiceKey}
                  htmlFor={voiceKey}
                  className={cn(
                    "voice-selector-option font-sans flex items-start gap-3",
                    !isSelected && "voice-selector-option-default",
                    isSelected && "voice-selector-option-selected",
                  )}
                >
                  <RadioGroupItem
                    value={voiceKey}
                    id={voiceKey}
                    disabled={disabled}
                    className="mt-0.5 shrink-0"
                  />
                  <div className="space-y-1 flex-1">
                    <p className="font-sans text-lg font-semibold text-(--text-primary) md:text-xl">
                      {voice.name}
                    </p>
                    <p className="text-sm leading-6 text-(--text-secondary)">
                      {voice.description}
                    </p>
                  </div>
                </Label>
              );
            })}
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default VoiceSelector;
