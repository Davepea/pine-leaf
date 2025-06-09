// lib/auth.ts
"use client"
interface User {
	id: number;
	account_name: string;
	account_number: string;
	balance: number;
	bank_name: number;
	created_at: string;
	email: string;
	email_verified_at: string;
	enabled: 1;
	fullName: string;
	my_referral_code: string;
	number: string;
	referral_bonus: number;
	referral_code: string;
	referred_by: string;
	role: string;
	star: number;
	total_withdraw: number;
	updated_at: string;
}


export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    // Also set in session storage as fallback
    sessionStorage.setItem('token', token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }
  return null;
};

export const clearToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }
};

export const getUser = ():User => {
	if(typeof window === 'undefined') {

		return JSON.parse(localStorage?.getItem('user'))
	}
}