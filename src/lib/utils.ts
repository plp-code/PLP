export const getTodayHours = (
  hours?: Record<string, string>,
): { isOpen: boolean; string: string } => {
  if (!hours) return { isOpen: false, string: "Hours unavailable" };
  
  const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const longDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  
  const dayIdx = new Date().getDay();
  const schedule = hours[shortDays[dayIdx]] || hours[longDays[dayIdx]];

  if (!schedule || schedule.toLowerCase() === "closed") {
    return { isOpen: false, string: "Closed Today" };
  }

  const times = schedule.split("-");
  if (times.length !== 2) return { isOpen: false, string: schedule };

  const parseToMinutes = (timeStr: string) => {
    const parts = timeStr.trim().split(":");
    const h = parseInt(parts[0], 10);
    const m = parts.length > 1 ? parseInt(parts[1], 10) : 0;
    return h * 60 + m;
  };

  const openMins = parseToMinutes(times[0]);
  let closeMins = parseToMinutes(times[1]);

  if (closeMins <= openMins) closeMins += 24 * 60; 

  const now = new Date();
  const currentMins = now.getHours() * 60 + now.getMinutes();

  const isOpen = currentMins >= openMins && currentMins < closeMins;


  const formatTime = (mins: number) => {
    let h = Math.floor(mins / 60);
    const m = mins % 60;
    const ampm = (h % 24) >= 12 ? "pm" : "am";
    h = h % 12;
  
    return `${h}${m > 0 ? `:${m.toString().padStart(2, '0')}` : ""}${ampm}`;
  };

  return { isOpen, string: `${formatTime(openMins)} - ${formatTime(closeMins)}` };
};