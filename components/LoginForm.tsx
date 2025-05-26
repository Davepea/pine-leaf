"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginFormProps {
  onSubmit: (emailOrPhone: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(emailOrPhone, password);
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow-md md:p-16 p-10 relative max-w-[996px]" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email-phone" className="block text-gray-700 mb-2">
            Email / Phone number
          </label>
          <input
            id="email-phone"
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F5318]"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F5318]"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex justify-end mt-2">
            <Link href="/forgot-password">
              <span className="text-sm text-[#2F5318] hover:underline cursor-pointer">
                Forgot Password?
              </span>
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#2F5318] text-white font-medium rounded-md hover:bg-[#254015] transition duration-300"
        >
          Login
        </button>
      </form>

       <div className="mt-6">
        <p className="text-gray-600">
          You&apos;re not a member?{' '}
          <Link href="/login">
            <span className="text-[#2F5318] font-medium hover:underline cursor-pointer">
              Register
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;


