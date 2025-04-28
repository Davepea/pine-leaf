"use client"
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-20 pb-10 gap-[60px]">
      <div className="text-center flex flex-col gap-[1.1vw] p-[6.9vw]">
        <div className="flex items-center justify-center">
          <h1 className="text-[#2F5318] font-lato border-b-2 border-[#2F5318] md:text-[32px] pb-[1vw]">
          Login as a Realtor
              </h1>
        </div>
        <p className=" text-[14px] font-roboto"> Log in to access your dashboard, track your progress, and stay connected with Pineleaf.</p>
      </div>

      <form className="bg-white w-full max-w-[996px] md:py-20 md:px-[69] rounded-lg shadow-md space-y-6 border-[1px] border-[#4D794F]">
        <div>
          <label className="block mb-1 font-medium">Email / Phone number</label>
          <input
            type="text"
            placeholder="Enter your email or phone"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2F5318]"
              required
            />
            <span
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>
          <div className="text-sm text-right mt-1">
            <a href="#" className="text-green-700 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#2F5318] hover:bg-green-800 text-white font-semibold py-2 rounded-md"
        >
          Login
        </button>

        <p className="text-center text-sm">
          You&apos;re not a member?{" "}
          <Link href="/register" className="text-[#2F5318] font-medium hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
