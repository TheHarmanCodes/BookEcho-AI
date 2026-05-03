"use server";

import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";

import { connectToDatabase } from "@/database/mongoose";
import TranscriptHistory from "@/database/models/transcript-history.model";
import { Messages, TranscriptHistoryResult, TranscriptMutationResult } from "@/types";
import { getUserPlan } from "@/lib/subscription.server";
import { PLAN_LIMITS } from "@/lib/subscription-constants";

const getValidatedBookObjectId = (bookId: string) => {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return null;
  }

  return new mongoose.Types.ObjectId(bookId);
};

export const getTranscriptHistory = async (
  bookId: string,
): Promise<TranscriptHistoryResult> => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, messages: [], error: "Unauthorized" };
    }

    const plan = await getUserPlan();
    if (!PLAN_LIMITS[plan].hasSessionHistory) {
      return { success: true, messages: [] };
    }

    const bookObjectId = getValidatedBookObjectId(bookId);
    if (!bookObjectId) {
      return { success: false, messages: [], error: "Invalid book ID" };
    }

    await connectToDatabase();

    const history = await TranscriptHistory.findOne({
      clerkId: userId,
      bookId: bookObjectId,
    })
      .select("messages")
      .lean();

    return {
      success: true,
      messages: Array.isArray(history?.messages) ? (history.messages as Messages[]) : [],
    };
  } catch (error) {
    console.error("Error fetching transcript history:", error);
    return {
      success: false,
      messages: [],
      error: "Failed to load transcript history.",
    };
  }
};

export const appendTranscriptMessage = async (
  bookId: string,
  message: Messages,
): Promise<TranscriptMutationResult> => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized", persisted: false };
    }

    const normalizedRole = message.role?.trim();
    const normalizedContent = message.content?.trim();
    if (!normalizedRole || !normalizedContent) {
      return { success: false, error: "Invalid transcript message", persisted: false };
    }

    const plan = await getUserPlan();
    if (!PLAN_LIMITS[plan].hasSessionHistory) {
      return { success: true, persisted: false };
    }

    const bookObjectId = getValidatedBookObjectId(bookId);
    if (!bookObjectId) {
      return { success: false, error: "Invalid book ID", persisted: false };
    }

    await connectToDatabase();

    const existingHistory = await TranscriptHistory.findOne({
      clerkId: userId,
      bookId: bookObjectId,
    })
      .select("messages")
      .lean();

    const lastMessage = existingHistory?.messages?.[existingHistory.messages.length - 1] as
      | Messages
      | undefined;

    if (
      lastMessage?.role === normalizedRole &&
      lastMessage?.content === normalizedContent
    ) {
      return { success: true, persisted: true };
    }

    await TranscriptHistory.findOneAndUpdate(
      { clerkId: userId, bookId: bookObjectId },
      {
        $push: {
          messages: {
            role: normalizedRole,
            content: normalizedContent,
          },
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    return { success: true, persisted: true };
  } catch (error) {
    console.error("Error appending transcript message:", error);
    return {
      success: false,
      error: "Failed to save transcript message.",
      persisted: false,
    };
  }
};

export const clearTranscriptHistory = async (
  bookId: string,
): Promise<TranscriptMutationResult> => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized", persisted: false };
    }

    const plan = await getUserPlan();
    if (!PLAN_LIMITS[plan].hasSessionHistory) {
      return { success: true, persisted: false };
    }

    const bookObjectId = getValidatedBookObjectId(bookId);
    if (!bookObjectId) {
      return { success: false, error: "Invalid book ID", persisted: false };
    }

    await connectToDatabase();

    await TranscriptHistory.findOneAndDelete({
      clerkId: userId,
      bookId: bookObjectId,
    });

    return { success: true, persisted: true };
  } catch (error) {
    console.error("Error clearing transcript history:", error);
    return {
      success: false,
      error: "Failed to clear transcript history.",
      persisted: false,
    };
  }
};
