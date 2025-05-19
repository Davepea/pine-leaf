// types/index.ts
export interface Property {
  id: number;
  name: string;
  estate_name: string;
  description: string;
  images: string[];
  location: string;
  landmark: string[];
  size: string;
  land_condition: string;
  document_title: string;
  property_features: string[];
  type: string;
  purpose: string;
  price: string;
  total_units: number;
  unit_sold: number;
  flyer: string | null;
  created_at: string;
  updated_at: string;
}

export interface RealtorRegistrationPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  // Add any other fields required by the API
}

export interface RealtorLoginPayload {
  login: string;     
  password: string;
}



export interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: Property[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface PropertySearchParams {
  page?: number;
  query?: string;
  location?: string;
  estate_name?: string;
  property_type?: string;
  min_price?: number;
  max_price?: number;
}


