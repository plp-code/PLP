export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export type MapStatus = "live" | "waitlist" | "dropped";

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
  user: User;
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