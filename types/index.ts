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


export interface PaymentVerificationResponse {
  success: boolean;
  message?: string;
  data?: {
    status: string;
    reference: string;
    amount: number;
  };
}

export interface RegistrationResponse {
  success: boolean;
  message?: string;
  data?: {
    userId: string;
    email: string;
  };
}

export interface PaystackResponse {
  reference: string;
  status: string;
  message: string;
  trans: string;
  transaction: string;
  trxref: string;
}

export interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  metadata: {
    fullName: string;
    phone: string;
    username: string;
    referralCode: string;
  };
  callback: (response: PaystackResponse) => void;
  onClose: () => void;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  referralCode: string;
  username: string;
  password: string;
  confirmPassword: string;
}
