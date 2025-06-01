"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import axios from 'axios';
import { setToken } from '@/lib/auth'

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

      if (response.data?.token) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token);
      }

      alert('Login successful!');
      router.push('/admin/dashboard');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Login as a Realtor | Pineleaf Estates</title>
        <meta name="description" content="Login to your Pineleaf Estates realtor dashboard" />
      </Head>

      <div className="relative">
        <div className="w-full h-64 relative">
          <Image
            src="/img/pine-1.png"
            alt="Pineleaf team"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white\ bg-opacity-30">
            <h1 className="text-4xl font-bold mb-6 large-header !text-white">Welcome back</h1>
            <div className="flex items-center space-x-4 text-white">
              <Link href="/"><span className="hover:underline cursor-pointer">Home</span></Link>
              <span>←</span>
              <Link href="/register"><span className="hover:underline cursor-pointer">Register</span></Link>
              <span>←</span>
              <span className="font-medium">Login</span>
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
