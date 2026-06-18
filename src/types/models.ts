export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface MapItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  region: string;
  map_price: number;
  has_access: boolean;
}

export interface Store {
  id: number;
  store_name: string;
  latitude: number;
  longitude: number;
  price_range: string;
  notes?: string;
  price_notes?: string;
  hours?: Record<string, string>;
  address?: string;
}