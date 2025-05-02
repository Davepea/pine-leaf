"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function RegistrationForm() {
  const [role, setRole] = useState<"realtor" | "investor">("realtor");

  return (
    <div className="max-w-4xl mx-auto p-[6.9vw]">
      <div>
        <div className="flex justify-center space-x-6 mb-6 md:text-[32px]  text-lg font-semibold">
          <button
            className={cn(role === "realtor" ? "text-[#2F5318] border-b-2 border-[#2F5318]" : "text-gray-500")}
            onClick={() => setRole("realtor")}
          >
            Register as a Realtor
          </button>
          <button
            className={cn(role === "investor" ? "text-[#2F5318] border-b-2 border-[#2F5318]" : "text-gray-500")}
            onClick={() => setRole("investor")}
          >
            Register as an Investor
          </button>
        </div>
        <p className="text-center">
          With ₦50,000 one-time payment or upload proof of offline payment, Earn with every sale. Join our growing network
          and access exclusive plots, marketing tools, and commissions.
        </p>
      </div>

      {role === "realtor" ? (
        <form className="grid grid-cols-1 max-w-[996px] md:grid-cols-2 gap-4 bg-white w-full  md:py-20 md:px-[69] rounded-lg shadow-md space-y-6 border-[1px] border-[#4D794F]">
          <div>
            <label htmlFor="fullName">Full Name</label>
            <Input id="fullName" placeholder="Full Name" required />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <Input id="email" placeholder="Email Address" type="email" required />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <Input id="phone" placeholder="Phone Number" required />
          </div>
          <div>
            <label htmlFor="referral">Referral Code (optional)</label>
            <Input id="referral" placeholder="Referral Code (optional)" />
          </div>
          <div className="col-span-2">
            <label htmlFor="payment">Choose Payment Option</label>
            <select id="payment" className="border rounded p-2 w-full">
              <option>Upload proof of payment (e.g receipt)</option>
              <option>Online payment</option>
            </select>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input id="password" placeholder="Password" type="password" required />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Input id="confirmPassword" placeholder="Confirm Password" type="password" required />
          </div>
          <div className="col-span-2 flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              I agree to the terms & Conditions
            </label>
          </div>
          <Button type="submit" className="col-span-2 bg-[#2F5318] hover:bg-green-800">
            Register
          </Button>
        </form>
      ) : (
        <form className="grid grid-cols-1  max-w-[996px] md:grid-cols-2 gap-4 bg-white w-full md:py-20 md:px-[69] rounded-lg shadow-md space-y-6 border-[1px] border-[#4D794F]">
          <div>
            <label htmlFor="fullNameInvestor">Full Name</label>
            <Input id="fullNameInvestor" placeholder="Full Name" required />
          </div>
          <div>
            <label htmlFor="emailInvestor">Email Address</label>
            <Input id="emailInvestor" placeholder="Email Address" type="email" required />
          </div>
          <div>
            <label htmlFor="phoneInvestor">Phone Number</label>
            <Input id="phoneInvestor" placeholder="Phone Number" required defaultValue="+234" />
          </div>
          <div>
            <label htmlFor="referralInvestor">Referral Code (optional)</label>
            <Input id="referralInvestor" placeholder="Referral Code (optional)" />
          </div>
          <div className="col-span-2">
            <label htmlFor="username">Username</label>
            <Input id="username" placeholder="Username" required />
          </div>
          <div>
            <label htmlFor="passwordInvestor">Password</label>
            <Input id="passwordInvestor" placeholder="Password" type="password" required />
          </div>
          <div>
            <label htmlFor="confirmPasswordInvestor">Confirm Password</label>
            <Input id="confirmPasswordInvestor" placeholder="Confirm Password" type="password" required />
          </div>
          <div className="col-span-2 flex items-center space-x-2">
            <Checkbox id="terms-investor" />
            <label htmlFor="terms-investor" className="text-sm">
              I agree to the terms & Conditions
            </label>
          </div>
          <Button type="submit" className="col-span-2 bg-[#2F5318] hover:bg-green-800">
            Register
          </Button>
        </form>
      )}
    </div>
  );
}
