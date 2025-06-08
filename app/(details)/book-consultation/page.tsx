"use client"
// pages/book-consultation.tsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { LiaArrowLeftSolid } from 'react-icons/lia';
import { Loader2 } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  consultationMode: string;
  preferredDate: string;
  preferredTime: string;
  noAttendees: string;
  additionalNotes: string;
}

interface ApiConsultationData {
  fullname: string;
  email: string;
  phone: string;
  consultation_date: string;
  consultation_time: string;
  no_attendees: number;
  mode: string;
  notes: string;
}

const BookConsultation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    consultationMode: '',
    preferredDate: '',
    preferredTime: '',
    noAttendees: '1',
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
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
    
    // Footer animation
    .from(footerRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.3");

    // Form field animations
    gsap.from('.form-field', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.5
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createConsultation = async (consultationData: ApiConsultationData): Promise<boolean> => {
    try {
      const response = await fetch('https://pineleaflaravel.sunmence.com.ng/public/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(consultationData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Consultation created successfully:', result);
      return true;
    } catch (error) {
      console.error('Error creating consultation:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    // Add submit animation
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    try {
      // Transform form data to API format
      const apiData: ApiConsultationData = {
        fullname: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        consultation_date: formData.preferredDate,
        consultation_time: formData.preferredTime.split('-')[0] || formData.preferredTime,
        no_attendees: parseInt(formData.noAttendees) || 1,
        mode: formData.consultationMode || '',
        notes: formData.additionalNotes || ''
      };

      await createConsultation(apiData);
      
      // Success toast
      toast.success('Consultation Booked Successfully!', {
        description: 'We will contact you soon to confirm your consultation.',
        duration: 5000,
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        consultationMode: '',
        preferredDate: '',
        preferredTime: '',
        noAttendees: '1',
        additionalNotes: ''
      });

      // Success animation
      gsap.to('.form-container', {
        scale: 1.02,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });

    } catch (error) {
      // Error toast
      toast.error('Failed to Book Consultation', {
        description: error instanceof Error ? error.message : 'Please try again later.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Book Consultation - Pine Leaf Estates</title>
        <meta name="description" content="Book a consultation with Pine Leaf Estates" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div ref={heroRef} className="relative bg-pineleaf-green text-white h-[320px]">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/img/pine-1.png" 
              alt="Pineleaf background" 
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="h-full relative z-10 container mx-auto  text-center flex flex-col justify-center items-center">
            <h1 className="mb-6 head-1 !text-white">Book Consultation</h1>
            <div className="flex justify-center gap-[14px] text-sm items-center">
              <Link href="/" className="hover:underline para-3">Home</Link>
               <LiaArrowLeftSolid strokeWidth={1.5} size={24} className='text-white' />
              <Link href="/register" className="hover:underline para-3 text-[#FBBF00] !font-[700]">Book</Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#2F5318] text-center mb-12">
              Book Consultation
            </h2>

            <div className="form-container bg-white rounded-lg shadow-lg p-8">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318] focus:border-transparent transition-all duration-200"
                      required
                      disabled={isSubmitting}
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318] focus:border-transparent transition-all duration-200"
                      required
                      disabled={isSubmitting}
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318] focus:border-transparent transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Number of Attendees */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Number of Attendees
                    </label>
                    <select
                      name="noAttendees"
                      value={formData.noAttendees}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318] focus:border-transparent transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5+ People</option>
                    </select>
                  </div>

                  {/* Preferred Mode of Consultation */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Preferred Mode of Consultation
                    </label>
                    <select
                      name="consultationMode"
                      value={formData.consultationMode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318] focus:border-transparent transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Choose preferred Mode</option>
                      <option value="in-person">In-Person</option>
                      <option value="video-call">Video Call</option>
                      <option value="phone-call">Phone Call</option>
                      <option value="email">Email</option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Preferred Date
                    </label>
                    <input
                      type='date'
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318] focus:border-transparent transition-all duration-200"
                      required
                      disabled={isSubmitting}
                      min={new Date().toISOString().split('T')[0]}
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318] focus:border-transparent transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Choose preferred Time</option>
                      <option value="09:00-10:00">9:00 AM - 10:00 AM</option>
                      <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                      <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                      <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
                      <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
                      <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
                    </select>
                  </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318] focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Any specific requirements or questions..."
                    disabled={isSubmitting}
                  />
                </div>

                {/* Submit Button */}
                <div className="form-field">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-btn w-full bg-[#2F5318] hover:bg-[#272726] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Booking Consultation...
                      </>
                    ) : (
                      'Submit'
                    )}
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

export default BookConsultation;