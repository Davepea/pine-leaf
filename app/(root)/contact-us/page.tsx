"use client"
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, FormEvent } from 'react';
import { MdOutlineEmail, MdOutlineLocationOn, MdOutlinePhoneInTalk} from 'react-icons/md';
import { toast } from "sonner";

// Types for the API request and response
interface ContactFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  subject: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const ContactUs: NextPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    subject: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitContactForm = async (data: ContactFormData): Promise<ApiResponse> => {
    const response = await fetch('https://pineleaflaravel.sunmence.com.ng/public/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        email: data.email,
        subject: data.subject,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      
      // Show success toast
      toast.success("Message sent successfully!", {
        description: "Thank you for your message! We will get back to you soon.",
        duration: 5000,
      });

      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        subject: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show error toast
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Please try again later.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title className='large-header'>Contact Us - Pineleaf Estates</title>
        <meta name="description" content="Contact Pineleaf Estates for all your real estate needs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="relative h-[464px] bg-gray-300">
        <Image 
          src="/img/service.png" 
          alt="Contact Us Hero" 
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center">
          <h1 className="head-1 !text-white pb-[9px]">Contact Us</h1>
          <p className="para-2 !leading-[25.5px] text-white">
            We&apos;re here to answer your questions, guide you through property investments, or simply have a chat.
          </p>
        </div>
      </div>
      
      <section className="py-[100px] px-[6.1458vw] bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-[100px]">
            {/* Contact Information */}
            <div className="md:w-1/3">
              <h2 className="head-4 pb-[20px]">Contact Information</h2>
              <p className="para-3 text-gray-600 mb-[30px]">
                Have questions about our properties, investment opportunities, or services? Our team is ready to assist you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MdOutlinePhoneInTalk className="text-[#2F5318] mt-1 mr-3" />
                  <p className="text-gray-700 para-3">+234-4001-2001-022</p>
                </div>
                
                <div className="flex items-start">
                  <MdOutlineEmail className="text-[#2F5318] mt-1 mr-3" />
                  <p className="text-gray-700 para-3">info@pineleafestates.com</p>
                </div>
                
                <div className="flex items-start">
                  <MdOutlineLocationOn className="text-[#2F5318] mt-1 mr-3" />
                  <div>
                    <p className="text-gray-700 para-3">Suit F17 Garbs Mega Plaza</p>
                    <p className="text-gray-700 para-3">39 Awka Road Onitsha,</p>
                    <p className="text-gray-700 para-3">Anambra State</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:w-2/3 bg-white rounded-lg shadow-2xl p-[77px] border border-gray-100 ">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Firstname"
                      className="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Lastname"
                      className="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <textarea
                    name="subject"
                    placeholder="&quot;I'm contacting you about&quot; (e.g. Property Purchase, Investment Plan, Realtor Program, General Inquiry...)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent h-32"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isLoading}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#2F5318] text-white font-medium py-3 px-6 rounded hover:bg-[#2F5318] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={submitContactForm}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <section className="h-[448px] w-full ">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5214371193426!2d6.783305999999999!3d6.178295999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043f3982d882ccb%3A0xc8bbfefb518a346!2s39%20Awka%20Rd%2C%20Onitsha%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1650456789012!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
};

export default ContactUs;