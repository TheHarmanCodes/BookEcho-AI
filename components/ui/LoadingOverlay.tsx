"use client";

import { LoaderCircle } from "lucide-react";

const uploadSteps = [
  "Uploading book files",
  "Preparing metadata",
  "Starting synthesis",
];

const LoadingOverlay = () => {
  return (
    <div className="loading-wrapper" aria-live="polite" aria-busy="true">
      <div className="loading-shadow-wrapper bg-[var(--bg-primary)] shadow-soft-lg">
        <div className="loading-shadow">
          <LoaderCircle className="loading-animation size-12 text-[var(--color-brand)]" />
          <div className="space-y-2 text-center">
            <h3 className="loading-title font-serif">Beginning Synthesis</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Your book is being prepared for its first conversation.
            </p>
          </div>
          <div className="loading-progress">
            {uploadSteps.map((step) => (
              <div key={step} className="loading-progress-item">
                <span className="loading-progress-status" />
                <span className="text-[var(--text-secondary)]">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
