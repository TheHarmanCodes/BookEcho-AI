"use client";

import { useRef, type ChangeEvent, type MouseEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";

import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_PDF_TYPES,
  DEFAULT_VOICE,
  voiceCategories,
  voiceOptions,
} from "@/lib/constants";
import { UploadSchema } from "@/lib/zod";
import { cn } from "@/lib/utils";
import type { BookUploadFormValues, FileDropzoneProps } from "@/types";

const voiceGroupLabels = {
  male: "Male Voices",
  female: "Female Voices",
} as const;

const submitButtonStyle = {
  backgroundColor: "#663820",
  color: "#fff",
  fontFamily: '"IBM Plex Serif", serif',
} as const;

const FileDropzone = ({
  id,
  label,
  placeholder,
  hint,
  accept,
  icon: Icon,
  file,
  error,
  onFileChange,
}: FileDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];
    onFileChange(nextFile);
    event.target.value = "";
  };

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onFileChange(undefined);
  };

  return (
    <FormItem className="space-y-3">
      <FormLabel className="form-label">{label}</FormLabel>
      <FormControl>
        <div className="space-y-3">
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={accept}
            className="sr-only"
            onChange={handleSelect}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={cn(
              "upload-dropzone file-upload-shadow w-full border border-dashed border-(--border-medium)",
              file && "upload-dropzone-uploaded",
            )}
            aria-describedby={`${id}-hint`}
          >
            <Icon className="upload-dropzone-icon" />
            <span className="upload-dropzone-text">
              {file ? file.name : placeholder}
            </span>
            <span id={`${id}-hint`} className="upload-dropzone-hint">
              {hint}
            </span>
          </button>
        </div>
      </FormControl>
      {file ? (
        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-soft-sm">
          <p className="truncate text-sm font-medium text-(--text-primary)">
            {file.name}
          </p>
          <button
            type="button"
            onClick={handleRemove}
            className="upload-dropzone-remove"
            aria-label={`Remove ${label}`}
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}
      {error ? (
        <p className="text-sm font-medium text-destructive">{error}</p>
      ) : null}
    </FormItem>
  );
};

const UploadForm = () => {
  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      pdf: undefined,
      coverImage: undefined,
      title: "",
      author: "",
      voice: DEFAULT_VOICE,
    },
  });

  const onSubmit = async (values: BookUploadFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Book upload form submitted", values);
  };

  return (
    <div className="new-book-wrapper">
      {form.formState.isSubmitting ? <LoadingOverlay /> : null}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pdf"
            render={({ field, fieldState }) => (
              <FileDropzone
                id="pdf-upload"
                label="Book PDF File"
                placeholder="Click to upload PDF"
                hint="PDF file (max 50MB)"
                accept={ACCEPTED_PDF_TYPES.join(",")}
                icon={Upload}
                file={field.value}
                error={fieldState.error?.message}
                onFileChange={field.onChange}
              />
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field, fieldState }) => (
              <FileDropzone
                id="cover-upload"
                label="Cover Image (Optional)"
                placeholder="Click to upload cover image"
                hint="Leave empty to auto-generate from PDF"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                icon={ImagePlus}
                file={field.value}
                error={fieldState.error?.message}
                onFileChange={field.onChange}
              />
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="form-input h-12 md:h-14 border border-(--border-subtle) shadow-soft-sm"
                    placeholder="ex: Rich Dad Poor Dad"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Author Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="form-input h-12 md:h-14 border border-(--border-subtle) shadow-soft-sm"
                    placeholder="ex: Robert Kiyosaki"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Choose Assistant Voice
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="space-y-6 font-sans"
                  >
                    {(
                      Object.keys(voiceCategories) as Array<
                        keyof typeof voiceCategories
                      >
                    ).map((category) => (
                      <div key={category} className="space-y-4">
                        <p className=" text-base text-(--text-secondary)">
                          {voiceGroupLabels[category]}
                        </p>
                        <div
                          className={cn(
                            "grid gap-4",
                            category === "male"
                              ? "md:grid-cols-3"
                              : "md:grid-cols-2",
                          )}
                        >
                          {voiceCategories[category].map((voiceKey) => {
                            const voice = voiceOptions[voiceKey];
                            const isSelected = field.value === voiceKey;

                            return (
                              <Label
                                key={voiceKey}
                                htmlFor={voiceKey}
                                className={cn(
                                  "voice-selector-option font-sans flex items-start gap-3",
                                  !isSelected &&
                                    "voice-selector-option-default",
                                  isSelected &&
                                    "voice-selector-option-selected",
                                )}
                              >
                                <RadioGroupItem
                                  value={voiceKey}
                                  id={voiceKey}
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="form-btn" style={submitButtonStyle}>
            Begin Synthesis
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UploadForm;
