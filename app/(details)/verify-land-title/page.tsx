'use client';
import React, { useState } from 'react';
import { ArrowLeft,ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LandTitleVerification = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    document: null as File | null
  });
 

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

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
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
                    <Link href="/" className="hover:underline">Home
                    </Link>
                    <span><ArrowLeft/></span>
                    <Link href="/register" className="hover:underline text-[#FFCC00]">Book
                    </Link>
                   
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
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F5318]  focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F5318]  focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Document
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
                    />
                   <div className='flex gap-[10px]'>
                     <label
                      htmlFor="document"
                      className="cursor-pointer b hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-700 transition-colors border border-[#2F531833]"
                    >
                      Choose File
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      {formData.document ? formData.document.name : 'No file chosen'}
                    </p>
                   </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-[#2F5318] hover:bg-[#1b1c1b] text-white font-medium py-3 px-8 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2F5318]  focus:ring-offset-2 rounded-lg"
                >
                  Upload document
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default LandTitleVerification;