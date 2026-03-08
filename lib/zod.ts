import { z } from "zod";

import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_PDF_TYPES,
  DEFAULT_VOICE,
  MAX_FILE_SIZE,
  MAX_IMAGE_SIZE,
  voiceOptions,
} from "@/lib/constants";

const isFile = (value: unknown): value is File => {
  return typeof File !== "undefined" && value instanceof File;
};

const pdfFileSchema = z
  .custom<File>((value) => isFile(value), {
    message: "Please upload a PDF file",
  })
  .refine((file) => ACCEPTED_PDF_TYPES.includes(file.type), {
    message: "Only PDF files are allowed",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "PDF must be 50MB or smaller",
  });

const imageFileSchema = z
  .custom<File | undefined>((value) => value === undefined || isFile(value), {
    message: "Please choose a valid image file",
  })
  .refine(
    (file) => file === undefined || ACCEPTED_IMAGE_TYPES.includes(file.type),
    {
      message: "Cover image must be JPG, PNG, or WebP",
    },
  )
  .refine((file) => file === undefined || file.size <= MAX_IMAGE_SIZE, {
    message: "Cover image must be 10MB or smaller",
  });

export const UploadSchema = z.object({
  pdf: pdfFileSchema,
  coverImage: imageFileSchema.optional(),
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(120, "Title must be 120 characters or fewer"),
  author: z
    .string()
    .trim()
    .min(2, "Author name must be at least 2 characters")
    .max(80, "Author name must be 80 characters or fewer"),
  voice: z
    .enum(Object.keys(voiceOptions) as [keyof typeof voiceOptions, ...Array<keyof typeof voiceOptions>])
    .default(DEFAULT_VOICE),
});
