import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

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
  icon: any;
  iconColor: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  title: string;
  subtitle?: string;
  autoCloseMs?: number;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      setProgress(100);
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (show) {
      setProgress(100);
      requestAnimationFrame(() => setIsVisible(true));
    }
  }, [show]);

  useEffect(() => {
    if (show && autoCloseMs) {
      const interval = 50;
      const step = (interval / autoCloseMs) * 100;

      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(progressTimer);
            return 0;
          }
          return prev - step;
        });
      }, interval);

      const closeTimer = setTimeout(handleClose, autoCloseMs);

      return () => {
        clearInterval(progressTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [show, autoCloseMs, handleClose]);

  if (!show && !isClosing) return null;

  const positionClasses = {
    "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
    "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
    "top-right": "top-4 right-4 sm:top-6 sm:right-6",
    "top-left": "top-4 left-4 sm:top-6 sm:left-6",
  };

  const slideDirection = {
    "bottom-right":
      isVisible && !isClosing
        ? "translate-y-0 translate-x-0"
        : "translate-y-4 translate-x-4",
    "bottom-left":
      isVisible && !isClosing
        ? "translate-y-0 translate-x-0"
        : "translate-y-4 -translate-x-4",
    "top-right":
      isVisible && !isClosing
        ? "translate-y-0 translate-x-0"
        : "-translate-y-4 translate-x-4",
    "top-left":
      isVisible && !isClosing
        ? "translate-y-0 translate-x-0"
        : "-translate-y-4 -translate-x-4",
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 w-[calc(100%-2rem)] sm:w-auto sm:max-w-sm`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border ${borderColor} ${bgColor} ${textColor} shadow-lg backdrop-blur-sm transition-all duration-300 ease-out ${
          isVisible && !isClosing
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        } ${slideDirection[position]}`}
      >
        <div className="px-4 py-3 sm:px-5 sm:py-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Icon size={20} className={`mt-0.5 shrink-0 ${iconColor}`} />
            <div>
              <p className="font-bold text-sm sm:text-base">{title}</p>
              {subtitle && (
                <p className="text-sm mt-0.5 opacity-80">{subtitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            className={`${iconColor} hover:opacity-70 transition-colors shrink-0`}
            aria-label="Close message"
          >
            <X size={18} />
          </button>
        </div>

        {autoCloseMs && (
          <div className="h-1 w-full bg-black/5">
            <div
              className={`h-full ${iconColor.replace("text-", "bg-")} transition-all ease-linear`}
              style={{
                width: `${progress}%`,
                transitionDuration: "50ms",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
