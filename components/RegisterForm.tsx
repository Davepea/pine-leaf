"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { registerUser } from "@/services/registerService";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: PaystackOptions) => {
        openIframe: () => void;
      };
    };
  }
}

interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  ref?: string;
  currency?: string;
  metadata?: {
    fullName: string;
    phone: string;
    username: string;
    referralCode: string;
  };
  callback?: (response: { reference: string }) => void;
  onClose?: () => void;
}



const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    referralCode: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);

  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => setPaystackReady(true);
      document.body.appendChild(script);
    } else {
      setPaystackReady(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      agreeTerms: e.target.checked,
    }));

    if (errors.agreeTerms) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.agreeTerms;
        return copy;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to terms";
    return newErrors;
  };

  const handlePayment = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (!window.PaystackPop || !paystackReady) {
      alert("Payment system not loaded. Refresh and try again.");
      return;
    }

    setPaymentLoading(true);

    const handler = window.PaystackPop.setup({
      key: "pk_test_ade0c8518809b5eccc9002beb2dd0e79b9b4169c",
      email: formData.email,
      amount: 5000000, // 50,000 NGN in kobo
      currency: "NGN",
      ref: `reg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      metadata: {
        fullName: formData.fullName,
        phone: formData.phone,
        username: formData.username,
        referralCode: formData.referralCode || "none",
      },
      callback: function () {
        // Directly trust Paystack callback as verification
        setPaymentVerified(true);
        setPaymentLoading(false);
        alert("Payment successful! You can now register.");
      },
      onClose: function () {
        setPaymentLoading(false);
        alert("Payment cancelled.");
      },
    });

    handler.openIframe();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentVerified) {
      alert("Please complete payment before registering.");
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const result = await registerUser(formData);
      if (result.success) {
        alert("Registration successful!");
        window.location.href = "/login";
      } else {
        alert(result.message || "Registration failed.");
      }
    } catch (error) {
      alert("Registration failed. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-[996px] mx-auto bg-white rounded-2xl shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+234"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Referral Code */}
          <div className="space-y-2">
            <Label htmlFor="referralCode">
              Referral Code <span className="text-gray-400">(optional)</span>
            </Label>
            <Input
              id="referralCode"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
            />
          </div>

          {/* Username */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="username">
              Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : ""}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
        {/* Agree to Terms */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="agreeTerms" className="text-sm">
            I agree to the{" "}
            <Link
              href="/terms"
              target="_blank"
              className="underline text-primary"
            >
              terms and conditions
            </Link>
            .
          </Label>
        </div>
        {errors.agreeTerms && (
          <p className="text-sm text-red-500">{errors.agreeTerms}</p>
        )}

        {/* Paystack Payment Button */}
        <Button
          type="button"
          onClick={handlePayment}
          disabled={paymentLoading || !paystackReady}
          className="w-full py-4 h-[50px] bg-[#2F5318]"
        >
          {paymentLoading ? "Processing Payment..." : "Pay 50,000 naira"}
        </Button>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          A one-time payment is required before you can register.
        </div>

        {/* Register Button */}
        <Button
          type="submit"
          disabled={!paymentVerified}
          className="w-full py-4 h-[50px] bg-[#2F5318]"
        >
          Register
        </Button>
      </form>

      <div className="mt-6 text-center text-gray-600">
        Already a member?{" "}
        <Link href="/login" className="text-[#2F5318] underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
