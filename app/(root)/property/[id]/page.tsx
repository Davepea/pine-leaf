'use client'; 

import React, { useState, useEffect } from 'react';
import {  useParams } from 'next/navigation'; 
import Image from 'next/image';
import {  MapPin as MapIcon, CarFrontIcon } from 'lucide-react';
import Link from 'next/link';

import { CiSignpostDuo1 } from 'react-icons/ci';
import { FaSignsPost } from 'react-icons/fa6';
import { MdOutlineFlag, MdStoreMallDirectory } from 'react-icons/md';
import { propertyService } from '@/services/PropertyService';
import PropertyListing from '@/components/PropertyListing';

type PropertyDetail = {
  id: number;
  location: string;
  title?: string;
  name?: string;
  price: number | string;
  size?: string;
  dryLand?: string;
  land_condition?: string;
  instantLocation?: string;
  type?: string;
  purpose?: string;
  srcImage?: string;
  images?: string[];
  property_features?: string[];
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  year_built?: string;
  contact_phone?: string;
  contact_email?: string;
  amenities?: string[];
  title_document?: string;
  landmarks?: {
    location?: string;
    drive_to_cbn?: string;
    drive_to_ukwu?: string;
  };
};

const PropertyDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.id;

  const [property, setProperty] = useState<PropertyDetail | null>(null);

  const [loading, setLoading] = useState(true);
 


    const handleDownload = () => {
    const link = document.createElement('a');
      link.href = '/img/invest-plan.jpg'; 
      link.download = 'investment-brochure.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };


  useEffect(() => {
    if (id) {
      fetchPropertyDetail(id as string);
 
    }
  }, [id]);

  const fetchPropertyDetail = async (propertyId: string) => {
    try {
      setLoading(true);
      const data = await propertyService.searchProperties({ id: propertyId });
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
      setProperty(null);
    } finally {
      setLoading(false);
    }
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

  const displayTitle = property.name || property.title || 'Platinum Estate Awka';
 
  // Process images
  const allImages = property.images && property.images.length > 0 
    ? property.images.map(img => `https://pineleaflaravel.sunmence.com.ng/public${img}`)
    : property.srcImage 
    ? [`https://pineleaflaravel.sunmence.com.ng/public${property.srcImage}`]
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
              <div className="absolute inset-0 b bg-opacity-40"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
                  <h1 className="text-5xl font-bold mb-6 text-center !text-white">{displayTitle}</h1>

            
              
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
                  alt={displayTitle}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = '/img/placeholder-property.jpg';
                  }}
                />
              </div>
            </div>

            {/* Additional Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-2 gap-3">
                {allImages.slice(1, 3).map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={image}
                      alt={`${displayTitle} - Image ${index + 2}`}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/img/placeholder-property.jpg';
                      }}
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
                <h3 className="text-[32px] text-gray-700 mb-4">{displayTitle}</h3>
                
                <p className="text-gray-600 leading-relaxed text-[16px]">
                  {property.description || 
                  "Pineleaf Platinum Estate is strategically located in a prime area of Awka South, Anambra State, offering easy access to key landmarks. It has a 5-minute drive from CBN Quarters and Oranwezkuiku Pineleaf Estate Awka, and only 3 minutes from Ukwu Oji, making it an ideal location for residential and commercial development. The estate is easily accessible with a well-connected road network, ensuring seamless movement to and from the city's major hubs."}
                </p>
              </div>

              {/* Landmarks Section */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  Landmarks
                </h4>
                <div className="space-y-3 text-lg">
                  <div className="flex items-center text-gray-600">
                    <MapIcon className="w-4 h-4 mr-2 mt-0.5 text-[#4D794F]" />
                    <div>
                      <span className="font-[700]">Location:</span> {property.landmarks?.location || "Umuawulu, Awka South, Anambra State"}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CarFrontIcon className="w-4 h-4 mr-2 mt-0.5 text-[#4D794F]" />
                    <span>{property.landmarks?.drive_to_cbn || "5 mins drive from CBN Quarters and Oranwezkuiku Pineleaf Estate Awka"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CarFrontIcon className="w-4 h-4 mr-2 mt-0.5 text-[#4D794F]" />
                    <span>{property.landmarks?.drive_to_ukwu || "3 minutes drive from ukwu oji"}</span>
                  </div>
                </div>
              </div>

              {/* Property Overview */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Property Overview</h4>
                <div className="space-y-3 text-lg">
                  <div className="flex items-center  py-2 border-b border-gray-100">
                    <span className="font-[700] text-lg text-gray-700">Size:</span>
                    <span className="text-gray-600">{property.size || "464 sqm per plot"}</span>
                  </div>
                  <div className="flex items-center  py-2 border-b border-gray-100">
                    <span className="font-[700] text-lg text-gray-700">Land Condition:</span>
                    <span className="text-gray-600">{property.land_condition || "100% dry land"}</span>
                  </div>
                  <div className="flex items-center py-2">
                    <span className="font-[700] text-lg text-gray-700">Title Document:</span>
                    <span className="text-gray-600 text-right">{property.title_document || "Deed of Assignment & Registered Survey"}</span>
                  </div>
                </div>
              </div>

              {/* Property Features */}
              <div className="mb-9">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Property Features</h4>
                <div className="grid grid-cols-1 gap-3">
                  {(property.property_features || ["Good Road Network", "24/7 Security", "Play Area", "Shopping Mall"]).map((feature, index) => {
                    const getIcon = (feature: string) => {
                      if (feature.toLowerCase().includes('security')) return <CiSignpostDuo1 className="w-4 h-4" />;
                      if (feature.toLowerCase().includes('road')) return <FaSignsPost className="w-4 h-4" />;
                      if (feature.toLowerCase().includes('play')) return <MdOutlineFlag className="w-4 h-4" />;
                      if (feature.toLowerCase().includes('shop')) return <MdStoreMallDirectory className="w-4 h-4" />;
                      return <div className="w-2 h-2 bg-[#2F5318] rounded-full" />;
                    };

                    return (
                      <div key={index} className="flex items-center text-gray-600 text-lg">
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
            
            {/* Right Column - Action Buttons */}
            <div className="">
              <div className="">
                {/* Action Buttons */}
                <div className=" flex gap-7  ">
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
                
                  <button className=" border-2 border-[#2F5318] text-[#2F5318] py-3 px-4 rounded-lg hover:bg-green-50 transition-colors font-semibold text-sm"  onClick={handleDownload}>
                    Download Flyer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        <div className="mt-25">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-start">Similar Properties</h2>
          
          <PropertyListing/>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;