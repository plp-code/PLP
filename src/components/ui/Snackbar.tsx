"use client";

import {
  useState,
  useEffect,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { X, type LucideIcon } from "lucide-react";

export const Snackbar = ({
  show,
  onClose,
  icon: Icon,
  iconColor,
  borderColor,
  bgColor,
  textColor,
  title,
  subtitle,
  autoCloseMs,
  position = "bottom-right",
}: {
  show: boolean;
  onClose: () => void;
  icon: LucideIcon;
  iconColor: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  title: string;
  subtitle?: string;
  autoCloseMs?: number;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);

    const timeout = window.setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      setProgress(100);
      onClose();
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [onClose]);

  useEffect(() => {
    if (show) {
      setProgress(100);
      setIsClosing(false);

      const frame = requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => cancelAnimationFrame(frame);
    }

    setIsVisible(false);
  }, [show]);

  useEffect(() => {
    if (!show || !autoCloseMs) return;

    const interval = 50;
    const step = (interval / autoCloseMs) * 100;

    const progressTimer = window.setInterval(() => {
      setProgress((prev) => Math.max(prev - step, 0));
    }, interval);

    const closeTimer = window.setTimeout(() => {
      handleClose();
    }, autoCloseMs);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(closeTimer);
    };
  }, [show, autoCloseMs, handleClose]);

  if (!mounted || (!show && !isClosing)) return null;

  const positionClasses = {
    "bottom-right":
      "bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6",
    "bottom-left":
      "bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 sm:bottom-6 sm:left-6",
    "top-right":
      "top-[calc(1rem+env(safe-area-inset-top))] right-4 sm:top-6 sm:right-6",
    "top-left":
      "top-[calc(1rem+env(safe-area-inset-top))] left-4 sm:top-6 sm:left-6",
  };

  const slideDirection = {
    "bottom-right":
      isVisible && !isClosing
        ? "translate-x-0 translate-y-0"
        : "translate-x-4 translate-y-4",

    "bottom-left":
      isVisible && !isClosing
        ? "translate-x-0 translate-y-0"
        : "-translate-x-4 translate-y-4",

    "top-right":
      isVisible && !isClosing
        ? "translate-x-0 translate-y-0"
        : "translate-x-4 -translate-y-4",

    "top-left":
      isVisible && !isClosing
        ? "translate-x-0 translate-y-0"
        : "-translate-x-4 -translate-y-4",
  };

  return createPortal(
    <div
      className={`pointer-events-none fixed ${positionClasses[position]} z-[5000] w-[calc(100%-2rem)] sm:w-auto sm:max-w-sm`}
    >
      <div
        className={`pointer-events-auto relative overflow-hidden rounded-2xl border ${borderColor} ${bgColor} ${textColor} shadow-lg backdrop-blur-sm transition-all duration-300 ease-out ${
          isVisible && !isClosing
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0"
        } ${slideDirection[position]}`}
      >
        <div className="flex items-start justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex min-w-0 items-start gap-3">
            <Icon
              size={20}
              className={`mt-0.5 shrink-0 ${iconColor}`}
            />

            <div className="min-w-0">
              <p className="font-bold text-sm sm:text-base">
                {title}
              </p>

              {subtitle && (
                <p className="mt-0.5 text-sm opacity-80">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className={`${iconColor} shrink-0 transition-opacity hover:opacity-70`}
            aria-label="Close message"
          >
            <X size={18} />
          </button>
        </div>

        {autoCloseMs && (
          <div className="h-1 w-full bg-black/5">
            <div
              className={`h-full ${iconColor.replace(
                "text-",
                "bg-"
              )} transition-all ease-linear`}
              style={{
                width: `${progress}%`,
                transitionDuration: "50ms",
              }}
            />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};