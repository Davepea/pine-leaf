export interface PaymentVerificationResponse {
  success: boolean;
  message?: string;
}

export interface RegistrationResponse {
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
}): Promise<RegistrationResponse> {
  const res = await fetch("https://pineleaflaravel.sunmence.com.ng/public/api/realtor/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      referral_code: formData.referralCode,
      username: formData.username,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to register");
  }

  return (await res.json()) as RegistrationResponse;
}
