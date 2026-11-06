export type InPersonEvent = {
  id: string;
  title: string;
  description: string;
  status: "confirmed" | "planning";
  /** ISO date (YYYY-MM-DD). Omit while the date is still to be announced. */
  date?: string;
  time?: string;
  location?: string;
  price?: string;
  href?: string;
};

export type OneOnOneService = {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  href?: string;
};

export const IN_PERSON_EVENTS: InPersonEvent[] = [
  // {
  //   id: "thrift-pop-up",
  //   title: "The Preloved Professional Thrift Pop-Up",
  //   description:
  //     "Curated workwear from extra small sizes to plus sizes. From business casual to business professional and everything in between.",
  //   status: "confirmed",
  //   date: "2026-11-15",
  //   time: "12:00 - 3:00 PM",
  //   location: "8151 W 3rd St, Los Angeles, CA",
  //   href: "https://partiful.com/e/dbFF7gSfKLyQZRXPH2IP",
  // },

  // Planning / no date -> "In the Works"
];

export const ONE_ON_ONE_SERVICES: OneOnOneService[] = [];
