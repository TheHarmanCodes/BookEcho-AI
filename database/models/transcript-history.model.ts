import { ITranscriptHistory } from "@/types";
import { model, models, Schema } from "mongoose";

const TranscriptMessageSchema = new Schema(
  {
    role: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const TranscriptHistorySchema = new Schema<ITranscriptHistory>(
  {
    clerkId: { type: String, required: true, index: true, trim: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    messages: { type: [TranscriptMessageSchema], default: [] },
  },
  { timestamps: true },
);

TranscriptHistorySchema.index({ clerkId: 1, bookId: 1 }, { unique: true });

const TranscriptHistory =
  models.TranscriptHistory ||
  model<ITranscriptHistory>("TranscriptHistory", TranscriptHistorySchema);

export default TranscriptHistory;
