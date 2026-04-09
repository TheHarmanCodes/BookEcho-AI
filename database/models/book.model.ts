import { IBook } from "@/types";
import { model, Schema, models } from "mongoose";

const BookSchema = new Schema<IBook>(
  {
    clerkId: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    author: { type: String, required: true, trim: true },
    persona: { type: String },
    fileURL: { type: String, required: true, trim: true },
    fileBlobKey: { type: String, required: true },
    coverURL: { type: String },
    coverBlobKey: { type: String },
    fileSize: { type: Number, required: true },
    totalSegments: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Book = models.Book || model<IBook>("Book", BookSchema);

export default Book;
