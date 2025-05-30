"use client"
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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

interface ApiPayload {
  fullname: string;
  email: string;
  phone: string;
  property_id: number;
  inspection_date: string;
  inspection_time: string;
  no_attendees: number;
  notes: string;
}

// Property mapping to IDs
const propertyIdMap: Record<string, number> = {
  'greenfield-estate': 1,
  'riverside-gardens': 2,
  'hillview-heights': 3,
  'royal-palm-estate': 4,
  'crystal-waters': 5,
  'emerald-valley': 6,
};

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

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitInspectionRequest = async (payload: ApiPayload): Promise<void> => {
    const response = await fetch('https://pineleaflaravel.sunmence.com.ng/public/api/inspections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Form validation
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    
    if (!formData.preferredProperty) {
      toast.error('Please select a preferred property');
      return;
    }
    
    if (!formData.preferredDate) {
      toast.error('Please select an inspection date');
      return;
    }
    
    if (!formData.preferredTime) {
      toast.error('Please select a preferred time slot');
      return;
    }
    
    if (!formData.numberOfPeople) {
      toast.error('Please specify the number of attendees');
      return;
    }

    setIsSubmitting(true);

    try {
      // Transform form data to API payload
      const apiPayload: ApiPayload = {
        fullname: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        property_id: propertyIdMap[formData.preferredProperty] || 1,
        inspection_date: formData.preferredDate,
        inspection_time: formData.preferredTime.split('-')[0], // Extract start time (e.g., "15:16" from "15:16-16:16")
        no_attendees: parseInt(formData.numberOfPeople) || 1,
        notes: formData.additionalNotes.trim() || '',
      };

      // Submit to API
      await submitInspectionRequest(apiPayload);

    

      // Show success toast
      toast.success('Inspection request submitted successfully!', {
        description: 'We will contact you shortly to confirm your appointment.',
        duration: 5000,
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        preferredProperty: '',
        preferredDate: '',
        preferredTime: '',
        numberOfPeople: '',
        additionalNotes: ''
      });

    } catch (error) {
      console.error('Failed to submit inspection request:', error);
      
      // Show error toast
      toast.error('Failed to submit inspection request', {
        description: error instanceof Error ? error.message : 'Please try again later or contact support.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Book Site Inspection - Pine Leaf Estates</title>
        <meta name="description" content="Book a site inspection with Pine Leaf Estates" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div  className="relative bg-pineleaf-green text-white">
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
              <Link href="/" className="hover:underline">Home</Link>
              <span><ArrowLeft/></span>
              <Link href="/register" className="hover:underline text-[#FFCC00]">Book</Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div  className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#2F5318] text-center mb-12">
              Book Site Inspection
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
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
                      Email Address <span className="text-red-500">*</span>
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
                      Phone Number <span className="text-red-500">*</span>
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

                  {/* Preferred Property */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Preferred Property <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="preferredProperty"
                      value={formData.preferredProperty}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318] focus:border-transparent transition-all duration-200"
                      required
                      disabled={isSubmitting}
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
                      Preferred Date Inspection <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]} // Prevent past dates
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318] focus:border-transparent transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Preferred Time Slot */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Preferred Time Slot <span className="text-red-500">*</span>
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
                      <option value="08:00">8:00 AM - 9:00 AM</option>
                      <option value="09:00">9:00 AM - 10:00 AM</option>
                      <option value="10:00">10:00 AM - 11:00 AM</option>
                      <option value="11:00">11:00 AM - 12:00 PM</option>
                      <option value="14:00">2:00 PM - 3:00 PM</option>
                      <option value="15:00">3:00 PM - 4:00 PM</option>
                      <option value="16:00">4:00 PM - 5:00 PM</option>
                    </select>
                  </div>

                  {/* Number of People Attending */}
                  <div className="form-field">
                    <label className="block text-gray-700 font-medium mb-2">
                      Number of People Attending <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="numberOfPeople"
                      value={formData.numberOfPeople}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318] focus:border-transparent transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Choose Number</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5 People</option>
                      <option value="6">6+ People</option>
                    </select>
                  </div>

                  {/* Additional Notes */}
                  <div className="form-field md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Additional Notes/Request (Optional)
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5318] focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Any specific requirements or questions about the site inspection..."
                      disabled={isSubmitting}
                    />
                  </div>
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
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Inspection Request'
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

export default BookSiteInspection;