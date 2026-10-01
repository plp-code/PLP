export interface AuthResponse {
  message: string;
}

export interface CheckoutSessionResponse {
  checkout_url: string;
}

export interface ApiValidationError {
  loc?: (string | number)[];
  msg: string;
}