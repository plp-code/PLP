export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface MapItem {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  region?: string | null;
  price: number; // amount in cents
  is_purchased: boolean;
}

// Paginated envelope returned by GET /maps
export interface MapListResponse {
  maps: MapItem[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

// One day's opening hours (LocationHoursRead)
export interface LocationHours {
  id: number;
  day_of_week: number; // 0 = Monday ... 6 = Sunday
  open_time?: string | null; // "HH:MM:SS"
  close_time?: string | null; // "HH:MM:SS"
  is_closed: boolean;
}

// A point on a map (GET /maps/{slug}/locations -> LocationRead)
export interface Location {
  id: number;
  map_id: number;
  name: string;
  latitude: number;
  longitude: number;
  min_price?: number | null;
  max_price?: number | null;
  price_level?: number | null; // 1-3
  description?: string | null;
  hours: LocationHours[];
  created_at?: string;
  updated_at?: string;
}

// Lightweight marker (GET /maps/{slug}/locations/pins -> LocationMinimalRead)
export interface LocationPin {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}