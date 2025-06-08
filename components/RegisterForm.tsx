"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

import { registerUser } from "@/services/registerService";

const RegisterForm = () => {
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    referralCode: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    paymentMethod: "paystack",
    amount: 50000,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCheckboxChange = (checked: boolean | string) => {
    // Ensure checked is always a boolean
    const isChecked = typeof checked === 'string' ? checked === 'true' : checked;
    
    setFormData((prev) => ({
      ...prev,
      agreeTerms: isChecked,
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
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    
    return newErrors;
  };

  const isFormValid = () => {
    // Check all required fields are filled and terms are agreed
    return (
      formData.fullName.trim() !== "" &&
      formData.email.trim() !== "" &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.phone.trim() !== "" &&
      formData.username.trim() !== "" &&
      formData.password !== "" &&
      formData.password.length >= 6 &&
      formData.confirmPassword !== "" &&
      formData.password === formData.confirmPassword &&
      formData.agreeTerms === true
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      
      // Show toast for validation errors
      const errorMessages = Object.values(formErrors);
      if (errorMessages.length === 1) {
        toast.error(errorMessages[0]);
      } else {
        toast.error(`Please fix ${errorMessages.length} validation errors`);
      }
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerUser(formData);

      if (
        result.status === "pending_payment" &&
        typeof result.payment_url === "string"
      ) {
        // Show success message and redirect to Paystack
        toast.success("Registration submitted! Redirecting to payment...");
        
        // Small delay to show the toast, then redirect
        setTimeout(() => {
          window.location.href = result.payment_url;
        }, 1500);
        
      } else if (result.success) {
        toast.success("Registration successful! Redirecting to login...");
        
        // Delay redirect to show toast
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Registration failed. Please check your connection and try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
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
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="agreeTerms" className="text-sm">
            I agree to the{" "}
            <Link href="/terms" target="_blank" className="underline text-primary">
              terms and conditions
            </Link>
            .
          </Label>
        </div>
        {errors.agreeTerms && (
          <p className="text-sm text-red-500">{errors.agreeTerms}</p>
        )}

        {/* Register Button */}
        <Button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className="w-full py-4 h-[50px] bg-[#2F5318]"
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>

      <div className="mt-6 text-start text-gray-600">
        Already a member?{" "}
        <Link href="/login" className="text-[#2F5318] underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;