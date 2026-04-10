"use server";

import VoiceSession from "@/database/models/voice-session.model";
import { connectToDatabase } from "@/database/mongoose";
import { EndSessionResult, StartSessionResult } from "@/types";
import { getCurrentBillingPeriodStart } from "../subscription-constants";

export const startVoiceSession = async (
  clerkId: string,
  bookId: string,
): Promise<StartSessionResult> => {
  try {
    await connectToDatabase();

    //Limits / Plan to see weather a session is allowed.

    const session = await VoiceSession.create({
      clerkId, // who is the user
      bookId, // which book the user talking about
      startedAt: new Date(), // when user started that
      billingPeriodStart: getCurrentBillingPeriodStart(), //billing period started At
      durationSeconds: 0, // seconds
    });

    return {
      success: true,
      sessionId: session._id.toString(),
      // maxDurationMinutes: check.maxDurationsMinutes Pending....
    };
  } catch (err) {
    console.error("Error starting a voice session in session.actions.ts", err);
    return {
      success: false,
      error: "Failed to start voice session. Please try again later.",
    };
  }
};

// this will have to cases
// one the session is ended in success state or something bad happens
export const endVoiceSession = async (
  sessionId: string,
  durationSeconds: number,
): Promise<EndSessionResult> => {
  try {
    await connectToDatabase();

    const result = await VoiceSession.findByIdAndUpdate(sessionId, {
      endedAt: new Date(),
      durationSeconds,
    });

    if (!result) return { success: false, error: "Voice session not found." };

    return { success: true };
  } catch (e) {
    console.error("Error ending voice session", e);
    return {
      success: false,
      error: "Failed to end voice session. Please try again later.",
    };
  }
};
