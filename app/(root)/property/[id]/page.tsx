'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; 
import Image from 'next/image';
import { MapPin as MapIcon, CarFrontIcon } from 'lucide-react';
import Link from 'next/link';

import { CiSignpostDuo1 } from 'react-icons/ci';
import { FaSignsPost } from 'react-icons/fa6';
import { MdOutlineFlag, MdStoreMallDirectory } from 'react-icons/md';
import PropertyListing from '@/components/PropertyListing';

type PropertyDetail = {
  id: number;
  name: string;
  estate_name: string;
  description: string;
  images: string; // JSON string that needs to be parsed
  location: string;
  landmark: string; // JSON string that needs to be parsed
  size: string;
  land_condition: string;
  document_title: string;
  property_features: string; // JSON string that needs to be parsed
  type: string;
  purpose: string;
  price: string;
  total_units: number;
  unit_sold: number;
  flyer: string;
  created_at: string;
  updated_at: string;
};

type ApiResponse = {
  success: boolean;
  data: PropertyDetail;
};

const PropertyDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.id;

  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const handleDownload = () => {
    if (property?.flyer) {
      const link = document.createElement('a');
      link.href = `https://pineleaflaravel.sunmence.com.ng/public${property.flyer}`;
      link.download = `${property.name}-flyer.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback to default flyer
      const link = document.createElement('a');
      link.href = '/img/invest-plan.jpg';
      link.download = 'investment-brochure.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPropertyDetail(id as string);
    }
  }, [id]);

  const fetchPropertyDetail = async (propertyId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://pineleaflaravel.sunmence.com.ng/public/api/properties/search/${propertyId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch property');
      }
      const apiResponse: ApiResponse = await response.json();
      
      if (apiResponse.success && apiResponse.data) {
        setProperty(apiResponse.data);
      } else {
        setProperty(null);
      }

      console.log(apiResponse);
      
    } catch (error) {
      console.error('Error fetching property:', error);
      setProperty(null);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to safely parse JSON strings
  const parseJsonString = (jsonString: string): string[] => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return [];
    }
  };

  // Helper function to format price
  const formatPrice = (price: string): string => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#2F5318]"></div>
      </div>
    );
  }

  // Property not found state
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
          <Link href="/" className="text-[#2F5318] hover:underline">
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  // Parse JSON strings from API
  const images = parseJsonString(property.images);
  const landmarks = parseJsonString(property.landmark);
  const features = parseJsonString(property.property_features);

  // Process images
  const allImages = images.length > 0 
    ? images.map(img => `https://pineleaflaravel.sunmence.com.ng/public${img}`)
    : ['/img/placeholder-property.jpg'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${allImages[0]})`
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white h-80">
          <div className="absolute inset-0">
            <Image
              src="/img/pprm-hero.png"
              alt="Team of realtors"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0  bg-opacity-40"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl font-bold mb-6 text-center !text-white">{property.name}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            {/* Main Property Image */}
            <div className="mb-6">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={allImages[0]}
                  alt={property.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Additional Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-1">
                {allImages.slice(1, 3).map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={image}
                      alt={`${property.name} - Image ${index + 2}`}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Middle Column - Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-white">
              {/* Property Header */}
              <div className="mb-8">
                <h2 className="text-[40px] font-bold text-[#2F5318CC] mb-1">Pineleaf</h2>
                <h3 className="text-[32px] text-gray-700 mb-4">{property.name}</h3>
                <p className="text-xl text-black opacity-90">{formatPrice(property.price)}</p>

                
                <p className="text-gray-600 leading-relaxed text-[16px]">
                  {property.description}
                </p>
              </div>

              {/* Landmarks Section */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  Landmarks
                </h4>
                <div className="space-y-3 text-lg">
                  <div className="flex items-center text-gray-600 py-2 border-b border-[#C6CCD2]">
                    <MapIcon className="w-4 h-4 mr-2 mt-0.5 text-[#4D794F]" />
                    <div>
                      <span className="font-[700]">Location:</span> {landmarks[0] || "Umuawulu, Awka South, Anambra State"}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 py-2 border-b border-[#C6CCD2]">
                    <CarFrontIcon className="w-4 h-4 mr-2 mt-0.5 text-[#4D794F]" />
                    <span>{landmarks[1] || "5 mins drive from CBN Quarters and Oranwezkuiku Pineleaf Estate Awka"}</span>
                  </div>
                  <div className="flex items-center text-gray-600 py-2 border-b border-[#C6CCD2]">
                    <CarFrontIcon className="w-4 h-4 mr-2 mt-0.5 text-[#4D794F]" />
                    <span>{landmarks[2] || "3 minutes drive from ukwu oji"}</span>
                  </div>
                </div>
              </div>

              {/* Property Overview */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Property Overview</h4>
                <div className="space-y-3 text-lg">
                  <div className="flex items-center  py-2 border-b border-[#C6CCD2]">
                    <span className="font-[700] text-lg text-gray-700">Size:</span>
                    <span className="text-gray-600">{property.size}</span>
                  </div>
                  <div className="flex items-center  py-2 border-b border-[#C6CCD2]">
                    <span className="font-[700] text-lg text-gray-700">Land Condition:</span>
                    <span className="text-gray-600">{property.land_condition}</span>
                  </div>
                  <div className="flex items-center py-2">
                    <span className="font-[700] text-lg text-gray-700">Title Document:</span>
                    <span className="text-gray-600 text-right">{property.document_title}</span>
                  </div>
                </div>
              </div>

              {/* Property Features */}
              <div className="mb-9">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Property Features</h4>
                <div className="grid grid-cols-1 gap-3">
                  {features.map((feature, index) => {
                    const getIcon = (feature: string) => {
                      if (feature.toLowerCase().includes('security')) return <CiSignpostDuo1 className="w-4 h-4" />;
                      if (feature.toLowerCase().includes('road')) return <FaSignsPost className="w-4 h-4" />;
                      if (feature.toLowerCase().includes('play')) return <MdOutlineFlag className="w-4 h-4" />;
                      if (feature.toLowerCase().includes('shop')) return <MdStoreMallDirectory className="w-4 h-4" />;
                      return <div className="w-2 h-2 bg-[#2F5318] rounded-full" />;
                    };

                    return (
                      <div key={index} className="flex items-center text-gray-600 text-lg py-2 border-b border-[#C6CCD2]">
                        <div className="text-[#4D794F] mr-3">
                          {getIcon(feature)}
                        </div>
                        <span>{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="">
              <div className="flex gap-7">
                <Link href="/book-site-inspection">
                  <button className="w-full border-2 border-[#2F5318] text-[#2F5318] py-3 px-4 rounded-lg hover:bg-green-50 transition-colors font-semibold text-sm">
                    Book Site Inspection
                  </button>
                </Link>
                <Link href="/book-consultation">
                  <button className="w-full border-2 border-[#2F5318] text-[#2F5318] py-3 px-4 rounded-lg hover:bg-green-50 transition-colors font-semibold text-sm">
                    Request More Info
                  </button>
                </Link>
                
                <button 
                  className="border-2 border-[#2F5318] text-[#2F5318] py-3 px-4 rounded-lg hover:bg-green-50 transition-colors font-semibold text-sm"  
                  onClick={handleDownload}
                >
                  Download Flyer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-start">Similar Properties</h2>
          <PropertyListing/>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;