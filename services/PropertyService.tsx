import axios, { AxiosError } from 'axios';
import { ApiResponse, ApiErrorResponse, PropertySearchParams, PropertyDetail } from '../types';

export const propertyService = {
  async searchProperties(params: PropertySearchParams = {}) {
    try {
      const response = await axios.get<ApiResponse>(
        'https://pineleaflaravel.sunmence.com.ng/public/api/properties/search',
        { 
          params,
          headers: {
            'Accept': 'application/json'
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
