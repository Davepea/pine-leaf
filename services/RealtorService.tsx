import axios, { AxiosError } from 'axios';
import { ApiResponse, ApiErrorResponse, RealtorRegistrationPayload,RealtorLoginPayload } from '../types';

export const realtorService = {
  async registerRealtor(payload: RealtorRegistrationPayload) {
    try {
      const response = await axios.post<ApiResponse>(
        'https://pineleaflaravel.sunmence.com.ng/public/api/realtor/register',
        payload,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw {
          message: axiosError.response?.data?.message || 'An unexpected error occurred',
          errors: axiosError.response?.data?.errors
        };
      }
      throw { message: 'An unexpected error occurred' };
    }
  },
 async loginRealtor(payload: RealtorLoginPayload) {
    try {
      const response = await axios.post<ApiResponse>(
        'https://pineleaflaravel.sunmence.com.ng/public/api/realtor/login',
        payload,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw {
          message: axiosError.response?.data?.message || 'An unexpected error occurred',
          errors: axiosError.response?.data?.errors
        };
      }
      throw { message: 'An unexpected error occurred' };
    }
  }
};
