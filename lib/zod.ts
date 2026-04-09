import { z } from "zod";

import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_PDF_TYPES,
  MAX_FILE_SIZE,
  MAX_IMAGE_SIZE,
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

export const UploadSchema = z.object({
  pdfFile: pdfFileSchema,
  coverImage: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_IMAGE_SIZE,
      "Image size must be less than 10MB",
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported",
    ),
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(120, "Title is too long"),
  author: z
    .string()
    .trim()
    .min(2, "Author name must be at least 2 characters")
    .max(100, "Author name is too long"),
  persona: z.string().min(1, "Please select a voice"),
});
