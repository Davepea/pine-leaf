"use client"
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { useState, FormEvent } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs: NextPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    subject: ''
  });


  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      subject: ''
    });
    alert('Thank you for your message! We will get back to you soon.');
  };
  
 

  return (
    <>
      <Head>
        <title className='large-header'>Contact Us - Pineleaf Estates</title>
        <meta name="description" content="Contact Pineleaf Estates for all your real estate needs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    
      
  
      <div className="relative h-64 md:h-80 bg-gray-300">
        <Image 
          src="/hero-contact.jpg" 
          alt="Contact Us Hero" 
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center">
          <h1 className="large-header !text-white">Contact Us</h1>
          <p className="text-white text-lg md:text-xl text-center max-w-2xl">
            We&apos;re here to answer your questions, guide you through property investments, or simply have a chat.
          </p>
        </div>
      </div>
      
    
      <section className="py-16 px-[6.1458vw] bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Contact Information */}
            <div className="md:w-1/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-6">
                Have questions about our properties, investment opportunities, or services? Our team is ready to assist you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaPhone className="text-green-700 mt-1 mr-3" />
                  <p className="text-gray-700">+234-4001-2001-022</p>
                </div>
                
                <div className="flex items-start">
                  <FaEnvelope className="text-green-700 mt-1 mr-3" />
                  <p className="text-gray-700">info@pineleafestates.com</p>
                </div>
                
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-green-700 mt-1 mr-3" />
                  <div>
                    <p className="text-gray-700">Suit F17 Garbs Mega Plaza</p>
                    <p className="text-gray-700">39 Awka Road Onitsha,</p>
                    <p className="text-gray-700">Anambra State</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:w-2/3 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Firstname"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Lastname"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <textarea
                    name="subject"
                    placeholder="&quot;I'm contacting you about&quot; (e.g. Property Purchase, Investment Plan, Realtor Program, General Inquiry...)"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent h-32"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-green-800 text-white font-medium py-3 px-6 rounded hover:bg-green-700 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
  
      <section className="h-96 w-full">
        {/* Replace with your Google Maps API key for production */}
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