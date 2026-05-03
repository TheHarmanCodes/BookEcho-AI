"use client";

import { Loader2, Mic, MicOff, Trash2 } from "lucide-react";
import useVapi from "@/hooks/useVapi";
import { IBook, Messages } from "@/types";
import Image from "next/image";
import Transcript from "@/components/Transcript";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { clearTranscriptHistory } from "@/lib/actions/transcript.actions";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VapiControls = ({
  book,
  initialMessages,
}: {
  book: IBook;
  initialMessages: Messages[];
}) => {
  const [isClearingTranscript, setIsClearingTranscript] = useState(false);
  const {
    status,
    isActive,
    messages,
    currentMessage,
    currentUserMessage,
    duration,
    start,
    stop,
    clearError,
    clearTranscript,
    limitError,
    isBillingError,
    maxDurationSeconds,
  } = useVapi(book, initialMessages);
  const router = useRouter();

  useEffect(() => {
    if (limitError) {
      toast.error(limitError);
      if (isBillingError) {
        router.push("/subscriptions");
      }
      clearError();
    }
  }, [isBillingError, limitError, router, clearError]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "connecting":
        return { label: "Connecting...", color: "vapi-status-dot-connecting" };
      case "starting":
        return { label: "Starting...", color: "vapi-status-dot-starting" };
      case "listening":
        return { label: "Listening", color: "vapi-status-dot-listening" };
      case "thinking":
        return { label: "Thinking...", color: "vapi-status-dot-thinking" };
      case "speaking":
        return { label: "Speaking", color: "vapi-status-dot-speaking" };
      default:
        return { label: "Ready", color: "vapi-status-dot-ready" };
    }
  };

  const statusDisplay = getStatusDisplay();
  const hasTranscript =
    messages.length > 0 || !!currentMessage || !!currentUserMessage;

  const handleClearTranscript = async () => {
    setIsClearingTranscript(true);

    try {
      const result = await clearTranscriptHistory(book._id);

      if (!result.success) {
        toast.error(result.error || "Failed to clear transcript history.");
        return;
      }

      clearTranscript();
      toast.success("Transcript cleared.");
    } catch (error) {
      console.error("Failed to clear transcript:", error);
      toast.error("Failed to clear transcript history.");
    } finally {
      setIsClearingTranscript(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header Card */}
        <div className="vapi-header-card">
          <div className="vapi-cover-wrapper">
            <Image
              src={book.coverURL || "/images/book-placeholder.png"}
              alt={book.title}
              width={120}
              height={180}
              className="vapi-cover-image w-30! h-auto!"
              priority
            />
            <div className="vapi-mic-wrapper relative">
              {isActive && (status === "speaking" || status === "thinking") && (
                <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
              )}
              <button
                onClick={isActive ? stop : start}
                disabled={status === "connecting"}
                aria-label={
                  isActive ? "Stop voice assistant" : "Start voice assistant"
                }
                title={
                  isActive ? "Stop voice assistant" : "Start voice assistant"
                }
                className={`vapi-mic-btn shadow-md w-15! h-15! z-10 ${isActive ? "vapi-mic-btn-active" : "vapi-mic-btn-inactive"}`}
              >
                {isActive ? (
                  <Mic className="size-7 text-white" />
                ) : (
                  <MicOff className="size-7 text-[#212a3b]" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#212a3b] mb-1">
                {book.title}
              </h1>
              <p className="text-[#3d485e] font-medium">by {book.author}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="vapi-status-indicator">
                <span className={`vapi-status-dot ${statusDisplay.color}`} />
                <span className="vapi-status-text">{statusDisplay.label}</span>
              </div>

              <div className="vapi-status-indicator">
                <span className="vapi-status-text">
                  Voice: {book.persona || "Daniel"}
                </span>
              </div>

              <div className="vapi-status-indicator">
                <span className="vapi-status-text">
                  {formatDuration(duration)}/
                  {formatDuration(maxDurationSeconds)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="vapi-transcript-wrapper">
          <div className="transcript-container min-h-100">
            {hasTranscript && (
              <div className="flex items-center justify-end px-4 pt-4 sm:px-6 sm:pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearTranscript}
                  disabled={isClearingTranscript}
                  className="text-[#663820] hover:text-[#4d2a18]"
                >
                  {isClearingTranscript ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                  Clear transcript
                </Button>
              </div>
            )}
            <Transcript
              messages={messages}
              currentMessage={currentMessage}
              currentUserMessage={currentUserMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default VapiControls;
