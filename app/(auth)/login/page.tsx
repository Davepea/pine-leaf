"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import axios from 'axios';
import { setToken } from '@/lib/auth'
import { toast } from 'sonner';
import { LiaArrowLeftSolid } from 'react-icons/lia';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLoginSubmit = async (emailOrPhone: string, password: string) => {
    try {
      const response = await axios.post(
        'https://pineleaflaravel.sunmence.com.ng/public/api/realtor/login',
        {
          login: emailOrPhone,
          password,
        },
        {
          headers: { Accept: 'application/json' },
        }
      );

      const token = response.data?.token;
      const role = response.data?.user?.role;
      const userData = response.data?.user;

      // Enhanced debugging
      console.log('Full API Response:', response.data);
      console.log('Token:', token);
      console.log('Role:', role);
      console.log('Role type:', typeof role);
      console.log('User data:', userData);

      if (token) {
        // Store token using both methods
        setToken(token);
        localStorage.setItem('token', token);
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Verify token was stored
        console.log('Token stored:', localStorage.getItem('token'));
      }

      toast.success('Login successful!');

      // Clean the role to handle any whitespace issues
      const cleanRole = role?.toString().trim().toLowerCase();
      
      if (cleanRole === "admin") {
        console.log('Redirecting to admin dashboard');
        // Use setTimeout to ensure token is stored before navigation
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 100);
      } else if (cleanRole === "user") {
        console.log('Redirecting to user dashboard');
        console.log('Current pathname before redirect:', window.location.pathname);
        
        // Use setTimeout to ensure token is stored before navigation
        setTimeout(() => {
          router.push('/dashboard');
          console.log('Navigation to dashboard initiated');
        }, 100);
      } else {
        console.log('Unknown role:', cleanRole);
        toast.error('Invalid user role. Please contact support.');
      }

    } catch (error: any) {
      console.error('Login error:', error);
      
      // Enhanced error handling
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Login failed. Please try again.';
      
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Head>
        <title>Login as a Realtor | Pineleaf Estates</title>
        <meta name="description" content="Login to your Pineleaf Estates realtor dashboard" />
      </Head>

      <div className="relative">
        <div className="w-full h-[320px] relative">
          <Image
            src="/img/pine-1.png"
            alt="Pineleaf team"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30">
            <h1 className="text-4xl font-bold mb-6 large-header !text-white">Welcome back</h1>
            <div className="flex items-center gap-[14px] text-white">
              <Link href="/">
                <span className="hover:underline cursor-pointer">Home</span>
              </Link>
              <LiaArrowLeftSolid strokeWidth={1.5} size={24} className='text-white' />
              
              <Link href="/register">
                <span className="hover:underline cursor-pointer">Register</span>
              </Link>
              <LiaArrowLeftSolid strokeWidth={1.5} size={24} className='text-white' />
              
              <span className="font-medium text-[#FBBF00]">Login</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-[#2F5318] mb-4">Login as a Realtor</h2>
        <p className="text-center text-gray-600 mb-8">
          Log in to access your dashboard, track your progress, and stay connected with Pineleaf.
        </p>

        <LoginForm onSubmit={handleLoginSubmit} />
      </div>
    </>
  );
};

export default LoginPage;