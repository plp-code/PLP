export interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  is_verified?: boolean;
}

export type MapStatus = "live" | "waitlist" | "dropped" | "next";

export interface MapItem {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  region?: string | null;
  price: number;
  is_purchased: boolean;
  is_waitlisted: boolean;
  status: MapStatus;
}

export interface MapListResponse {
  maps: MapItem[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface LocationHours {
  id: number;
  day_of_week: number;
  open_time?: string | null;
  close_time?: string | null;
  is_closed: boolean;
}

export interface Location {
  id: number;
  map_id: number;
  name: string;
  latitude: number;
  longitude: number;
  min_price?: number | null;
  max_price?: number | null;
  price_level?: number | null;
  description?: string | null;
  google_place_id?: string | null;
  hours: LocationHours[];
  created_at?: string;
  updated_at?: string;
}

export interface LocationPin {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface ClothingCategory {
  id: number;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface ReviewItem {
  id: number;
  location_id: number;
  item_purchased: string;
  experience: string;
  price_paid?: number;
  created_at: string;
  updated_at: string;
  categories: ClothingCategory[];
  /** Only ever true on the caller's own review (GET /reviews/{id}/me). */
  is_hidden?: boolean;
  user?: ReviewAuthor | null;
}

/** Public-safe author info; never contains email, id or full last name. */
export interface ReviewAuthor {
  first_name?: string | null;
  last_initial?: string | null;
  /** Tolerated in case the API still sends it; only the initial is ever displayed. */
  last_name?: string | null;
}

export interface NewReview {
  experience: string;
  item_purchased: string;
  category_slugs: string[];
  price_paid?: number;
}

export interface CreateReviewPayload extends NewReview {
  location_id: number;
}

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
