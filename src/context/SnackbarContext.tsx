"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertCircle, CheckCircle2, Shield, type LucideIcon } from "lucide-react";
import { Snackbar } from "@/components/ui/Snackbar";

type Variant = "success" | "error" | "info";

interface Preset {
  icon: LucideIcon;
  iconColor: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  autoCloseMs: number;
  role: "status" | "alert";
}

const PRESETS: Record<Variant, Preset> = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-green-600",
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
    textColor: "text-green-900",
    autoCloseMs: 4000,
    role: "status",
  },
  error: {
    icon: AlertCircle,
    iconColor: "text-red-700",
    borderColor: "border-red-200",
    bgColor: "bg-red-50",
    textColor: "text-red-900",
    autoCloseMs: 6000,
    role: "alert",
  },
  info: {
    icon: Shield,
    iconColor: "text-amber-700",
    borderColor: "border-amber-200",
    bgColor: "bg-amber-50",
    textColor: "text-amber-900",
    autoCloseMs: 5000,
    role: "status",
  },
};

interface SnackbarMessage {
  id: number;
  variant: Variant;
  title: string;
  subtitle?: string;
}

interface SnackbarApi {
  success: (title: string, subtitle?: string) => void;
  error: (title: string, subtitle?: string) => void;
  info: (title: string, subtitle?: string) => void;
}

const noop = () => {};
const SnackbarContext = createContext<SnackbarApi>({
  success: noop,
  error: noop,
  info: noop,
});

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<SnackbarMessage | null>(null);
  const nextId = useRef(0);

  const show = useCallback(
    (variant: Variant, title: string, subtitle?: string) => {
      nextId.current += 1;
      setMessage({ id: nextId.current, variant, title, subtitle });
    },
    [],
  );

  const api = useMemo<SnackbarApi>(
    () => ({
      success: (title, subtitle) => show("success", title, subtitle),
      error: (title, subtitle) => show("error", title, subtitle),
      info: (title, subtitle) => show("info", title, subtitle),
    }),
    [show],
  );

  return (
    <SnackbarContext.Provider value={api}>
      {children}
      {message && (
        <ActiveSnackbar
          // New key per call: a replacement remounts and restarts the timer.
          key={message.id}
          message={message}
          onDone={setMessage}
        />
      )}
    </SnackbarContext.Provider>
  );
}

function ActiveSnackbar({
  message,
  onDone,
}: {
  message: SnackbarMessage;
  onDone: (updater: (current: SnackbarMessage | null) => null | SnackbarMessage) => void;
}) {
  const { id, variant, title, subtitle } = message;
  const preset = PRESETS[variant];

  // Id-bound so a late close from a replaced message can't clear the new one.
  const handleClose = useCallback(
    () => onDone((current) => (current?.id === id ? null : current)),
    [id, onDone],
  );

  return (
    <Snackbar
      show
      onClose={handleClose}
      icon={preset.icon}
      iconColor={preset.iconColor}
      borderColor={preset.borderColor}
      bgColor={preset.bgColor}
      textColor={preset.textColor}
      autoCloseMs={preset.autoCloseMs}
      role={preset.role}
      position="bottom-right"
      title={title}
      subtitle={subtitle}
    />
  );
}

export function useSnackbar() {
  return useContext(SnackbarContext);
}
