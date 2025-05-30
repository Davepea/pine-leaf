'use client'; // Only needed if using App Router

import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router'; // For Pages Router
import { useRouter, useParams } from 'next/navigation'; 
import Image from 'next/image';
import {  ArrowLeft, Clock, MapPin as LocationIcon, Home, Download, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import EstateCard from '@/components/EstateCard';

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
  // For Pages Router
  // const router = useRouter();
  // const { id } = router.query;
  
  // For App Router (uncomment if using App Router)
  const params = useParams();
  const id = params.id;

  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [similarProperties, setSimilarProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchPropertyDetail(id as string);
      fetchSimilarProperties(id as string);
    }
  }, [id]);

  const fetchPropertyDetail = async (propertyId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://pineleaflaravel.sunmence.com.ng/public/api/properties/search/${propertyId}`);
      if (response.ok) {
        const data = await response.json();
        setProperty(data);
      } else {
        console.error('Failed to fetch property details');
        // Handle error state
        setProperty(null);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      setProperty(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProperties = async (propertyId: string) => {
    try {
      setSimilarLoading(true);
      const response = await fetch(`https://pineleaflaravel.sunmence.com.ng/public/api/properties/similar/${propertyId}`);
      if (response.ok) {
        const data = await response.json();
        setSimilarProperties(data);
      } else {
        console.error('Failed to fetch similar properties');
        setSimilarProperties([]);
      }
    } catch (error) {
      console.error('Error fetching similar properties:', error);
      setSimilarProperties([]);
    } finally {
      setSimilarLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Property not found state
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
          <Link href="/" className="text-green-600 hover:underline">
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const displayTitle = property.name || property.title || 'Platinum Estate Awka';
  const numericPrice = typeof property.price === 'number' ? property.price : parseFloat(property.price);
  const displayPrice = isNaN(numericPrice) ? 'N/A' : numericPrice.toLocaleString();
  
  // Process images
  const allImages = property.images && property.images.length > 0 
    ? property.images.map(img => `https://pineleaflaravel.sunmence.com.ng/public${img}`)
    : property.srcImage 
    ? [`https://pineleaflaravel.sunmence.com.ng/public${property.srcImage}`]
    : ['/img/placeholder-property.jpg'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-64 bg-cover bg-center bg-gray-900"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${allImages[0]})`
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{displayTitle}</h1>
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-yellow-400 hover:text-yellow-300">Home</Link>
            <ArrowLeft className="w-4 h-4 rotate-180" />
            <Link href="/properties" className="text-yellow-400 hover:text-yellow-300">Properties</Link>
            <ArrowLeft className="w-4 h-4 rotate-180" />
            <span className="text-yellow-400">Property detail</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Property Header */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Pineleaf</h2>
                  <h3 className="text-xl text-gray-700">{displayTitle}</h3>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {property.description || 
                "Pineleaf Platinum Estate is strategically located in a prime area of Awka South, Anambra State, offering easy access to key landmarks. It has a 5-minute drive from CBN Quarters and Oranwezkuiku Pineleaf Estate Awka, and only 3 minutes from Ukwu Oji, making it an ideal location for residential and commercial development. The estate is easily accessible with a well-connected road network, ensuring seamless movement to and from the city's major hubs."}
              </p>

              {/* Landmarks */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Landmarks</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <LocationIcon className="w-4 h-4 mr-2" />
                    <span><strong>Location:</strong> {property.landmarks?.location || "Umuawulu, Awka South, Anambra State"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Home className="w-4 h-4 mr-2" />
                    <span>{property.landmarks?.drive_to_cbn || "5 mins drive from CBN Quarters and Oranwezkuiku Pineleaf Estate Awka"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{property.landmarks?.drive_to_ukwu || "3 minutes drive from ukwu oji"}</span>
                  </div>
                </div>
              </div>

              {/* Property Overview */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Property Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                  <div>
                    <strong>Size:</strong> {property.size || "464 sqm per plot"}
                  </div>
                  <div>
                    <strong>Land Condition:</strong> {property.land_condition || "100% dry land"}
                  </div>
                  <div className="md:col-span-2">
                    <strong>Title Document:</strong> {property.title_document || "Deed of Assignment & Registered Survey"}
                  </div>
                </div>
              </div>

              {/* Property Features */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Property Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {(property.property_features || ["Good Road Network", "24/7 Security", "Play Area", "Shopping Mall"]).map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allImages.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${displayTitle} - Image ${index + 1}`}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/img/placeholder-property.jpg';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Action Buttons */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <div className="space-y-4">
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  Book Site Inspection
                </button>
                
                <button className="w-full border-2 border-green-600 text-green-600 py-3 px-4 rounded-lg hover:bg-green-50 transition-colors font-semibold">
                  Request More Info
                </button>
                
                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Flyer
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-3">
                  {property.contact_phone && (
                    <a
                      href={`tel:${property.contact_phone}`}
                      className="flex items-center text-gray-600 hover:text-green-600"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {property.contact_phone}
                    </a>
                  )}
                  
                  {property.contact_email && (
                    <a
                      href={`mailto:${property.contact_email}`}
                      className="flex items-center text-gray-600 hover:text-green-600"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {property.contact_email}
                    </a>
                  )}
                </div>
              </div>

              {/* Price Display */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <div className="text-2xl font-bold text-green-600">₦{displayPrice}</div>
                <div className="text-gray-600 text-sm mt-1">Price per plot</div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Properties</h2>
          
          {similarLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : similarProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((similarProperty) => (
                <EstateCard
                  key={similarProperty.id}
                  id={similarProperty.id}
                  location={similarProperty.location}
                  name={similarProperty.name}
                  title={similarProperty.title}
                  price={similarProperty.price}
                  size={similarProperty.size}
                  dryLand={similarProperty.dryLand}
                  land_condition={similarProperty.land_condition}
                  instantLocation={similarProperty.instantLocation}
                  type={similarProperty.type}
                  purpose={similarProperty.purpose}
                  srcImage={similarProperty.srcImage}
                  images={similarProperty.images}
                  property_features={similarProperty.property_features}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-8">
              <p>No similar properties found at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;