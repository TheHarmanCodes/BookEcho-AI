"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { type ReactNode } from "react";

import { Button } from "@/components/ui/button";

type ButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | "link";

type StatusPageAction =
  | {
      label: string;
      href: string;
      variant?: ButtonVariant;
      icon?: "home" | "back";
    }
  | {
      label: string;
      onClick: () => void;
      variant?: ButtonVariant;
      icon?: "home" | "back";
    };

interface StatusPageProps {
  code: string | number;
  title: string;
  description: string;
  badgeLabel?: string;
  children?: ReactNode;
  actions?: StatusPageAction[];
  className?: string;
}

const iconMap = {
  home: Home,
  back: ArrowLeft,
};

const StatusPage = ({
  code,
  title,
  description,
  badgeLabel = "Something went wrong",
  children,
  actions = [
    { label: "Go Home", href: "/", icon: "home" },
    { label: "Go Back", href: "/", variant: "outline", icon: "back" },
  ],
  className = "",
}: StatusPageProps) => {
  return (
    <section
      className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-6 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="relative z-10 w-full max-w-4xl">
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <div className="space-y-6 text-center sm:space-y-8">
            {badgeLabel ? (
              <div className="mx-auto inline-flex items-center rounded-full border border-border/60 bg-background/75 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase shadow-soft-sm backdrop-blur-sm sm:text-xs">
                {badgeLabel}
              </div>
            ) : null}

            <div className="mx-auto flex h-48 w-48 animate-in zoom-in-75 duration-700 items-center justify-center rounded-full border border-primary/10 bg-gradient-to-br from-primary/20 via-background to-primary/5 shadow-soft-lg sm:h-64 sm:w-64 lg:h-80 lg:w-80">
              <div className="flex h-[84%] w-[84%] items-center justify-center rounded-full border border-border/50 bg-background/80 shadow-inner">
                <span className="font-serif text-6xl font-semibold tracking-tighter text-primary/65 sm:text-7xl lg:text-8xl">
                  {code}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="animate-in slide-in-from-bottom-2 duration-700 font-serif text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl lg:text-4xl xl:text-5xl">
                {title}
              </h1>

              <p className="mx-auto max-w-md animate-in slide-in-from-bottom-2 duration-700 text-base leading-7 text-muted-foreground sm:max-w-xl sm:text-lg lg:max-w-2xl lg:text-xl lg:leading-8">
                {description}
              </p>
            </div>

            {children ? (
              <div className="animate-in slide-in-from-bottom-2 duration-700">
                {children}
              </div>
            ) : null}

            {actions.length > 0 ? (
              <div className="animate-in slide-in-from-bottom-2 duration-700 flex flex-col items-center justify-center gap-3 px-2 sm:flex-row sm:gap-4">
                {actions.map((action, index) => {
                  const Icon = action.icon
                    ? iconMap[action.icon]
                    : index === 0
                      ? Home
                      : ArrowLeft;
                  const sharedClassName =
                    action.variant === "outline"
                      ? "min-h-12 w-full rounded-xl border-border/70 bg-background/85 px-6 text-foreground shadow-soft-sm transition-all duration-200 hover:scale-[1.02] hover:bg-accent/60 hover:shadow-soft sm:min-h-11 sm:w-auto"
                      : "min-h-12 w-full rounded-xl bg-foreground px-6 text-background shadow-soft-md transition-all duration-200 hover:scale-[1.02] hover:bg-foreground/90 hover:shadow-soft-lg sm:min-h-11 sm:w-auto";

                  if ("href" in action) {
                    return (
                      <Button
                        key={`${action.label}-${action.href}`}
                        asChild
                        variant={action.variant ?? "default"}
                        size="lg"
                        className={sharedClassName}
                      >
                        <Link href={action.href}>
                          <Icon className="size-5" />
                          {action.label}
                        </Link>
                      </Button>
                    );
                  }

                  return (
                    <Button
                      key={action.label}
                      type="button"
                      variant={action.variant ?? "default"}
                      size="lg"
                      className={sharedClassName}
                      onClick={action.onClick}
                    >
                      <Icon className="size-5" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatusPage;
