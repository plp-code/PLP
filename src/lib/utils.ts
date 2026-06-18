export const getTodayHours = (
  hours?: Record<string, string>,
): { isOpen: boolean; string: string } => {
  if (!hours) return { isOpen: false, string: "Hours unavailable" };
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = days[new Date().getDay()];
  const schedule = hours[today];

  if (!schedule || schedule === "Closed")
    return { isOpen: false, string: "Closed Today" };

  const [open, close] = schedule.split("-").map(Number);
  const now = new Date().getHours();
  const isOpen = now >= open && now < close;

  const formatTime = (h: number) =>
    `${h > 12 ? h - 12 : h}${h >= 12 ? "pm" : "am"}`;

  return { isOpen, string: `${formatTime(open)} - ${formatTime(close)}` };
};
