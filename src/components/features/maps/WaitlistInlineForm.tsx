"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, X } from "lucide-react";
import type { GuestWaitlistResult } from "@/hooks/useJoinWaitlist";
import type { MapItem } from "@/types/models";

export interface WaitlistControls {
  disabled: boolean;
  loadingSlug: string | null;
  expandedSlug: string | null;
  onJoin: (map: MapItem) => void;
  onCollapse: () => void;
  onSubmitEmail: (map: MapItem, email: string) => Promise<GuestWaitlistResult>;
}

interface WaitlistInlineFormProps {
  map: MapItem;
  controls: WaitlistControls;
  fullWidth?: boolean;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Animates height via grid rows (0fr -> 1fr) so no fixed heights are needed.
const collapsible = (open: boolean) =>
  `grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${
    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
  }`;

export function WaitlistInlineForm({
  map,
  controls,
  fullWidth,
}: WaitlistInlineFormProps) {
  const { disabled, loadingSlug, expandedSlug, onJoin, onCollapse } = controls;
  const expanded = expandedSlug === map.slug;
  // Server state only: guests are never shown as joined (no email-existence signal).
  const joined = map.is_waitlisted;
  const loading = loadingSlug === map.slug;

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const formId = useId();
  const errorId = `${formId}-error`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Set only when the user collapses the form, so a card collapsed because
  // another one opened doesn't steal focus.
  const returnFocus = useRef(false);

  // Reset the draft when the form closes (adjusting state during render).
  const [wasExpanded, setWasExpanded] = useState(expanded);
  if (wasExpanded !== expanded) {
    setWasExpanded(expanded);
    if (!expanded) {
      setEmail("");
      setError(null);
    }
  }

  useEffect(() => {
    if (expanded) {
      inputRef.current?.focus();
    } else if (returnFocus.current) {
      returnFocus.current = false;
      buttonRef.current?.focus();
    }
  }, [expanded]);

  const collapse = () => {
    if (submitting) return;
    returnFocus.current = true;
    onCollapse();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const trimmed = email.trim();
    if (!EMAIL_PATTERN.test(trimmed)) {
      setError("Please enter a valid email address.");
      inputRef.current?.focus();
      return;
    }

    setError(null);
    setSubmitting(true);
    const result = await controls.onSubmitEmail(map, trimmed);
    setSubmitting(false);

    if (!result.ok) {
      if (result.message) setError(result.message);
      inputRef.current?.focus();
    }
  };

  return (
    <div className={fullWidth ? "w-full" : undefined}>
      <div className={collapsible(!expanded)} inert={expanded}>
        <div className="min-h-0 overflow-hidden p-1 -m-1">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => onJoin(map)}
            disabled={disabled || joined || loading}
            aria-expanded={expanded}
            aria-controls={formId}
            className={`group/wl font-prata flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-plp-maroon bg-transparent px-5 py-2.5 text-sm font-bold text-plp-maroon transition-all duration-300 hover:bg-plp-maroon hover:text-white hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none ${
              fullWidth ? "w-full" : ""
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Joining...
              </>
            ) : joined ? (
              <>
                <CheckCircle2 size={16} />
                You&apos;re on the waitlist
              </>
            ) : (
              <>
                Join Waitlist
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover/wl:translate-x-0.5"
                />
              </>
            )}
          </button>
        </div>
      </div>

      <div className={collapsible(expanded)} inert={!expanded}>
        <div className="min-h-0 overflow-hidden p-1 -m-1">
          <form
            id={formId}
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.stopPropagation();
                collapse();
              }
            }}
            noValidate
            className="flex flex-col gap-2"
          >
            <label htmlFor={`${formId}-email`} className="sr-only">
              Email address
            </label>
            <input
              id={`${formId}-email`}
              ref={inputRef}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="Email address"
              value={email}
              disabled={submitting}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              className="plp-input h-11 w-full rounded-xl px-3 text-base"
            />
            <p
              id={errorId}
              aria-live="polite"
              className={
                error ? "text-xs font-bold text-plp-maroon" : "sr-only"
              }
            >
              {error}
            </p>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="plp-btn-primary font-prata flex h-11 min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-bold disabled:cursor-wait disabled:opacity-70"
              >
                {submitting ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                    aria-label="Submitting"
                  />
                ) : (
                  "Join"
                )}
              </button>
              <button
                type="button"
                onClick={collapse}
                disabled={submitting}
                aria-label="Cancel"
                className="plp-btn flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
