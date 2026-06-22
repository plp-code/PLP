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
  price: number;
  is_purchased: boolean;
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
