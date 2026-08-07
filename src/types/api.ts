export interface AuthResponse {
  message: string;
}

export interface CheckoutSessionResponse {
  url?: string;
  checkout_url?: string;
  session_url?: string;
}

/** A single FastAPI request-validation error entry (from `detail[]`). */
export interface ApiValidationError {
  loc?: (string | number)[];
  msg: string;
}