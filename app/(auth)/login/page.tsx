"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import LoginForm from '@/components/LoginForm';

const LoginPage: React.FC = () => {
  const handleLoginSubmit = (emailOrPhone: string, password: string) => {
    // Handle login logic here
    console.log('Login attempt with:', { emailOrPhone, password });
    // Implement authentication logic or API call
  };

  return (
    <>
      <Head>
        <title>Login as a Realtor | Pineleaf Estates</title>
        <meta name="description" content="Login to your Pineleaf Estates realtor dashboard" />
      </Head>

      <div className="relative">
        <div className="w-full h-64  relative">
          <Image 
            src="/img/pine-1.png" 
            alt="Pineleaf team" 
            layout="fill"
            objectFit="cover"
            priority
            
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-6 large-header !text-white">Welcome back</h1>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <span className="hover:underline cursor-pointer">Home</span>
              </Link>
              <span>←</span>
              <Link href="/register">
                <span className="hover:underline cursor-pointer">Register</span>
              </Link>
              <span>←</span>
              <span className="font-medium">Login</span>
            </div>
          </div>
        </div>
      </div>

    
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-[#2F5318] mb-4">Login as a Realtor</h2>
        <p className="text-center text-gray-600 mb-8">
          Log in to access your dashboard, track your progress, and stay connected with Pineleaf.
        </p>

        {/* Login Form Component */}
        <LoginForm onSubmit={handleLoginSubmit} />
      </div>

     
    </>
  );
};

export default LoginPage;