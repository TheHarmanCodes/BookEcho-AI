"use client";

import { useEffect } from "react";

import StatusPage from "@/components/StatusPage";

export default function Error({
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
    <StatusPage
      code="500"
      badgeLabel="Unexpected error"
      title="Something interrupted the reading flow"
      description="An unexpected error occurred. Try again, or head back to a safe page."
      actions={[
        { label: "Try Again", onClick: reset },
        { label: "Go Home", href: "/", variant: "outline", icon: "home" },
      ]}
    />
  );
}
