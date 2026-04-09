import { model, Schema, models } from "mongoose";
import { IBookSegment } from "@/types";

// once user/client upload the pdf then we split it into chunks
// later on i will pass this info vapi
const BookSegmentSchema = new Schema<IBookSegment>(
  {
    clerkId: { type: String, required: true },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      index: true,
    },
    content: { type: String, required: true },
    segmentIndex: { type: Number, required: true, index: true },
    pageNumber: { type: Number, index: true },
    wordCount: { type: Number, required: true },
  },
  { timestamps: true },
);

// these BookSegmentSchema.indexing will help in efficient segment retrieval,
//here it can go with bookId, segmentIndex , and marked as unique so that no duplicate segments are there
BookSegmentSchema.index({ bookId: 1, segmentIndex: 1 }, { unique: true });
BookSegmentSchema.index({ bookId: 1, pageNumber: 1 });

// here searching on specific content having scope to a specific segment.
BookSegmentSchema.index({ bookId: 1, content: "text" });

const BookSegment =
  models.BookSegment || model<IBookSegment>("BookSegment", BookSegmentSchema);

export default BookSegment;
