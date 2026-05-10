"use client";

import { useEffect } from "react";

import StatusPage from "@/components/StatusPage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StatusPage
          code="500"
          badgeLabel="Application error"
          title="The app ran into a critical error"
          description="Please try again. If the issue continues, return home and retry your last action."
          actions={[
            { label: "Try Again", onClick: reset },
            { label: "Go Home", href: "/", variant: "outline", icon: "home" },
          ]}
          className="min-h-screen py-6 sm:py-10"
        />
      </body>
    </html>
  );
}
