export interface PaymentVerificationResponse {
  success: boolean;
  message?: string;
}

export interface RegistrationResponse {
  status: string;
  payment_url: boolean;
  success: boolean;
  message?: string;
  data?: unknown;
}

export async function registerUser(formData: {
  fullName: string;
  email: string;
  phone: string;
  referralCode: string;
  username: string;
  password: string;
  confirmPassword: string;
  paymentMethod: string;
  amount: number;
}): Promise<RegistrationResponse> {
  const res = await fetch("https://pineleaflaravel.sunmence.com.ng/public/api/realtor/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      fullName: formData.fullName,
      email: formData.email,
      number: formData.phone,
      referral_code: formData.referralCode,
      username: formData.username,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      payment_method: formData.paymentMethod,
      amount: formData.amount,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to register");
  }

  return (await res.json()) as RegistrationResponse;
}
