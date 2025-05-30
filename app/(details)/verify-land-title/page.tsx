'use client';
import React, { useState } from 'react';
import { ArrowLeft, ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

// Types
interface FormData {
  fullName: string;
  email: string;
  document: File | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const LandTitleVerification = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    document: null
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      document: file
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return false;
    }
    if (!formData.document) {
      toast.error('Please upload a document');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // File size validation (10MB limit)
    if (formData.document.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return false;
    }

    return true;
  };

  const submitToAPI = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('document', formData.document!);

      const response = await fetch('https://pineleaflaravel.sunmence.com.ng/public/api/land', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json',
        }
      });

      const result: ApiResponse = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message || 'Land title verification submitted successfully!');
        
        // Reset form on success
        setFormData({
          fullName: '',
          email: '',
          document: null
        });
        
        // Reset file input
        const fileInput = document.getElementById('document') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      } else {
        toast.error(result.message || 'Failed to submit verification request');
      }
    } catch (error) {
      console.error('API Error:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        toast.error('Network error. Please check your internet connection.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitToAPI();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
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
          <h1 className="text-4xl font-bold mb-6 large-header !text-white">Verify Your Land Title</h1>
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <span><ArrowLeft/></span>
            <Link href="/register" className="hover:underline text-[#FFCC00]">Book</Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2F5318] mb-12">
            Verify Your Land Title
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                    disabled={isLoading}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                    disabled={isLoading}
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Document <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2F5318] transition-colors">
                  <div className="flex flex-col items-center">
                    <ImageIcon className="w-12 h-12 text-[#2F5318] mb-4"/>
                    
                    <input
                      type="file"
                      id="document"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      disabled={isLoading}
                    />
                    
                    <div className='flex gap-[10px] items-center'>
                      <label
                        htmlFor="document"
                        className={`cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-700 transition-colors border border-[#2F531833] ${
                          isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        Choose File
                      </label>
                      <p className="text-sm text-gray-500">
                        {formData.document ? formData.document.name : 'No file chosen'}
                      </p>
                    </div>
                    
                    <p className="text-xs text-gray-400 mt-2">
                      Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max: 10MB)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-[#2F5318] hover:bg-[#1b1c1b] text-white font-medium py-3 px-8 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:ring-offset-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isLoading ? 'Uploading...' : 'Upload Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandTitleVerification;