'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const PasswordResetPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://pineleaflaravel.sunmence.com.ng/public/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: ApiResponse = await response.json();

if (response.ok) {
        // Check if it's a success message
        if (data.message && data.message.toLowerCase().includes('sent')) {
          toast.success('Password reset link has been sent to your email address', {
            description: 'Please check your inbox and follow the instructions to reset your password.',
            duration: 5000,
          });
          setEmail('');
        } else if (data.success) {
          toast.success('Password reset link has been sent to your email address', {
            description: 'Please check your inbox and follow the instructions to reset your password.',
            duration: 5000,
          });
          setEmail('');
        } else {
          toast.error(data.message || 'An error occurred. Please try again.', {
            description: 'If the problem persists, please contact support.',
          });
        }
      } else {
        // Handle specific validation errors
        if (response.status === 422 && data.message.includes('invalid')) {
          toast.error('Email not found', {
            description: 'This email address is not registered. Please check the email or sign up for a new account.',
          });
        } else {
          toast.error(data.message || 'An error occurred. Please try again.', {
            description: 'If the problem persists, please contact support.',
          });
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Network error. Please check your connection and try again.', {
        description: 'Make sure you have a stable internet connection.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
        <div className="relative bg-pineleaf-green text-white">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/img/pine-1.png" 
              alt="Pineleaf background" 
              layout="fill"
              objectFit="cover"
            
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold mb-6 large-header !text-white">Password Reset</h1>
            {/* <p className="text-xl mb-8">Choose how you&apos;d like to join us</p> */}
            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/" className="hover:underline">Home
              </Link>
              <span>→</span>
              <Link href="/register" className="hover:underline">Login
              </Link>
              <span>→</span>
              <Link href="/login" className="hover:underline text-[#FBBF00]">Reset Password
              </Link>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <div className="py-16 px-4">
        <div className="max-w-[996px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#2F5318] mb-4">
              Enter your Email to Reset your Password
            </h2>
            <p className="text-gray-600">
              Reset your password to regain access to your account, manage your investments, and stay connected with Pineleaf Estate.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:px-15 md:py-25">
            <div>
                <form onSubmit={handleSubmit}>
              <div className="mb-13">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                  placeholder="Enter your email address"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2F5318] hover:bg-[#1c1d1b] disabled:bg-[#818f78] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Request link'}
              </button>
            </form>

            <div className="mt-6 text-start">
              <p className="text-gray-600">
                Remember your password?{' '}
                <Link href="/login" className="text-[#2F5318] hover:text-[#1c1d1b] font-medium">
                  Login
                </Link>
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default PasswordResetPage;