import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import EstateCard from '@/components/EstateCard';


const mockEstates = [
  {
    location: 'Umuezeawala Awka South',
    title: 'Platinum Estate Awka',
    price: 3000000,
    srcImage: "/img/property1.jpg",
    size: '464SQM',
    dryLand: '100% Dry Land',
    instantLocation: 'Instant Location',
    type: 'Buy & Build',
  },
  {
    location: 'Direct Opp Ebube Muonso School',
    title: 'Igbarian Phase 1',
    price: 8000000,
    srcImage: "/img/property2.jpg",
    size: '464SQM',
    dryLand: '100% Dry Land',
    instantLocation: 'Instant Location',
    type: 'Buy & Build',
  },
  {
    location: 'OPP WhiteTech Aluminium Company Asaba',
    title: 'Luxury City Asaba',
    price: 5000000,
    srcImage:"/img/property3.jpg",
    size: '464SQM',
    dryLand: '100% Dry Land',
    instantLocation: 'Instant Location',
    type: 'Buy & Build',
  },
 
];

// Types
interface PropertyFeature {
  icon: string;
  name: string;
}


interface PropertyDetail {
  id: string;
  name: string;
  estate: string;
  location: string;
  description: string;
  landmarks: {
    location: string;
    proximities: string[];
  };
  overview: {
    size: string;
    landCondition: string;
    titleDocument: string;
  };
  features: PropertyFeature[];
  images: string[];
  price: string;
  size: string;
  landCondition: string;
}

interface SimilarProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  size: string;
  landCondition: string;
  tags: string[];
  image: string;
}

// Base URL fallback if environment variable is not set
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Fetch property data
async function getProperty(id: string): Promise<PropertyDetail> {
  const res = await fetch(`${API_BASE_URL}/api/properties/${id}`, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    throw new Error('Failed to fetch property');
  }
  
  return res.json();
}

// Fetch similar properties
async function getSimilarProperties(id: string): Promise<SimilarProperty[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/properties/similar/${id}`, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      return []; // Return empty array if not found
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching similar properties:', error);
    return []; // Return empty array on error
  }
}

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  // In Next.js App Router, params is already resolved
  const id = params.id;
  
  try {
    const property = await getProperty(id);
    
    return {
      title: `${property.name} | ${property.estate}`,
      description: property.description.substring(0, 160),
    };
  } catch {
    return {
      title: 'Property Details',
      description: 'View details about this property',
    };
  }
}

export default async function PropertyDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  
  const id = params.id;
  
  
  const [property] = await Promise.all([
    getProperty(id),
    getSimilarProperties(id).catch(() => [])
  ]);

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 w-full">
        <div className="absolute inset-0 bg-black/30 z-10">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center i">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center ">
              {property.estate}
            </h1>
            <div className="mt-4 flex items-center text-white space-x-2">
              <Link href="/">
                <span className="hover:underline cursor-pointer">Home</span>
              </Link>
              <span>&rarr;</span>
              <Link href="/properties">
                <span className="hover:underline cursor-pointer">Properties</span>
              </Link>
              <span>&rarr;</span>
              <span className="text-gray-200">Property detail</span>
            </div>
          </div>
        </div>
        <Image 
          src='/img/prod-details.png' 
          alt={property.name}
          fill
          priority
          className="object-cover z-0"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-[6.2vw] py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Property Images */}
          <div className="md:col-span-1 flex flex-col gap-[25px]">
            <div className="bg-white rounded-lg overflow-hidden shadow-md ">
              <Image 
                src={property.images[1] || property.images[0]} 
                alt={property.name}
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <Image 
                src={property.images[2] || property.images[0]} 
                alt={property.name}
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <Image 
                src={property.images[2] || property.images[0]} 
                alt={property.name}
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg p-6 flex flex-col gap-[30px]">
              <div>
              <h2 className="text-2xl font-semibold text-[#2F5318]">{property.name}</h2>
              <h3 className="text-xl font-medium  mt-1">{property.estate}</h3>
              </div>
              
              <p className="mt-4 text-grey-600">
                {property.description}
              </p>

             <div>
               {/* Landmarks */}
               <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Landmarks</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span><strong>Location:</strong> {property.landmarks.location}</span>
                  </div>
                  {property.landmarks.proximities.map((proximity, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{proximity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Overview */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Property Overview</h4>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex py-2 border-b border-gray-100">
                    <span className=" font-medium">Size:</span>
                    <span className="text-[#2F5318]">{property.overview.size}</span>
                  </div>
                  <div className="flex py-2 border-b border-gray-100">
                    <span className=" font-medium">Land Condition:</span>
                    <span className="text-[#2F5318]">{property.overview.landCondition}</span>
                  </div>
                  <div className="flex py-2 border-b border-gray-100">
                    <span className=" font-medium">Title Document:</span>
                    <span className="text-[#2F5318]">{property.overview.titleDocument}</span>
                  </div>
                </div>
              </div>

             </div>
              {/* Property Features */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Property Features</h4>
                <div className="space-y-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="inline-flex items-center px-4 py-2 border border-[#2F5318] text-[#2F5318] bg-white rounded hover:bg-green-50 transition">
                  Book Site Inspection
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-[#2F5318] text-[#2F5318] bg-white rounded hover:bg-green-50 transition">
                  Request More Info
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-[#2F5318] text-[#2F5318] bg-white rounded hover:bg-green-50 transition">
                  Download Flyer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
       
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Similar Properties</h2>
      
           
              <section className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockEstates.map((estate, idx) => (
                  <EstateCard key={idx} {...estate} />
                ))}
              </section>
          
          </div>
    
      </div>

    
    </>
  );
}