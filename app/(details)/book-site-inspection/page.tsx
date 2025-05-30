"use client"
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';


interface FormData {
  fullName: string;
  email: string;
  phone: string;
  preferredProperty: string;
  preferredDate: string;
  preferredTime: string;
  numberOfPeople: string;
  additionalNotes: string;
}

const BookSiteInspection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    preferredProperty: '',
    preferredDate: '',
    preferredTime: '',
    numberOfPeople: '',
    additionalNotes: ''
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Hero animation
    tl.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    })
    // Form animation
    .from(formRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5")
    // Footer animation
    .from(footerRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.3");

    // Form field animations
    const formFields = formRef.current?.querySelectorAll('.form-field');
    if (formFields) {
      gsap.from(formFields, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out"
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Add submit animation
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <>
      <Head>
        <title>Book Site Inspection - Pine Leaf Estates</title>
        <meta name="description" content="Book a site inspection with Pine Leaf Estates" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
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
            <h1 className="text-4xl font-bold mb-6 large-header !text-white">Book Site Inspection</h1>
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
        <div className="container mx-auto px-4 py-16">
          <div ref={formRef} className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#2F5318] text-center mb-12">
              Book Site Inspection
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318]  focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318]  focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318]  focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Preferred Property */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Preferred Property
                    </label>
                    <select
                      name="preferredProperty"
                      value={formData.preferredProperty}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318]  focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Choose preferred location</option>
                      <option value="greenfield-estate">Greenfield Estate</option>
                      <option value="riverside-gardens">Riverside Gardens</option>
                      <option value="hillview-heights">Hillview Heights</option>
                      <option value="royal-palm-estate">Royal Palm Estate</option>
                      <option value="crystal-waters">Crystal Waters</option>
                      <option value="emerald-valley">Emerald Valley</option>
                    </select>
                  </div>

                  {/* Preferred Date Inspection */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Preferred Date Inspection
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318]  focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Preferred Time Slot */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Preferred Time Slot
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318]  focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Choose preferred Time</option>
                      <option value="8:00-9:00">8:00 AM - 9:00 AM</option>
                      <option value="9:00-10:00">9:00 AM - 10:00 AM</option>
                      <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                      <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                      <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
                      <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
                      <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
                    </select>
                  </div>
                  {/* Additional Notes */}
                    <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                        Additional Notes/Request (Optional)
                    </label>
                    <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b9e4a87] focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Any specific requirements or questions about the site inspection..."
                    />
                    </div>

                  {/* Number of People Attending */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Number of People Attending
                    </label>
                    <select
                      name="numberOfPeople"
                      value={formData.numberOfPeople}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318]  focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Choose Number</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5 People</option>
                      <option value="6+">6+ People</option>
                    </select>
                  </div>
                </div>

                

                {/* Submit Button */}
                <div className="form-field">
                  <button
                    type="submit"
                    className="submit-btn w-full bg-[#2F5318] hover:bg-[#272726] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2F5318]  focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default BookSiteInspection;