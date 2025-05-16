import { NextResponse } from 'next/server';

// Define a type for property data
interface Property {
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
  features: Array<{
    icon: string;
    name: string;
  }>;
  images: string[];
  price: string;
  size: string;
  landCondition: string;
}

// Define the type for the property data object
type PropertyDataRecord = Record<string, Property>;

// Mock property data
const propertyData: PropertyDataRecord = {
  "1": {
    id: "1",
    name: "Pineleaf",
    estate: "Platinum Estate Awka",
    location: "Umuawulu, Awka South, Anambra State",
    description: "Pineleaf Platinum Estate is strategically located in a prime area of Awka South, Anambra State, offering easy access to key landmarks. It is just a 5-minute drive from CBN Quarters and Oranwezukwu Pineleaf Estate Awka, and only 3 minutes from Ukwu Oji, making it an ideal location for residential and commercial development. The estate is easily accessible with a well-connected road network, ensuring seamless movement to and from the city's major hubs.",
    landmarks: {
      location: "Umuawulu, Awka South, Anambra State",
      proximities: [
        "5 mins drive from CBN Quarters and Oranwezukwu Pineleaf Estate Awka", 
        "3 minutes drive from ukwu oji"
      ]
    },
    overview: {
      size: "464 sqm per plot",
      landCondition: "100% dry land",
      titleDocument: "Deed of Assignment & Registered Survey"
    },
    features: [
      { icon: "road", name: "Good Road Network" },
      { icon: "security", name: "24/7 Security" },
      { icon: "playground", name: "Play Area" },
      { icon: "mall", name: "Shopping Mall" }
    ],
    images: [
      "/images/platinum-estate-hero.jpg",
      "/images/platinum-estate-layout.jpg",
      "/images/platinum-estate-aerial.jpg"
    ],
    price: "₦3,000,000",
    size: "464SQM",
    landCondition: "100% Dry Land"
  },
  "2": {
    id: "2",
    name: "Igbariam",
    estate: "Igbariam Phase 1",
    location: "Direct OPP Ebube Muonso School",
    description: "Igbariam Phase 1 is an exclusive residential estate located directly opposite Ebube Muonso School, offering premium plots for individuals looking to own land and secure their future. The estate benefits from excellent infrastructure and is situated in a rapidly developing area with fantastic future growth potential.",
    landmarks: {
      location: "Direct OPP Ebube Muonso School",
      proximities: [
        "5 mins drive from Igbariam Junction", 
        "15 mins to Otuocha Market"
      ]
    },
    overview: {
      size: "464 sqm per plot",
      landCondition: "100% dry land",
      titleDocument: "Deed of Assignment & Registered Survey"
    },
    features: [
      { icon: "road", name: "Good Road Network" },
      { icon: "security", name: "24/7 Security" },
      { icon: "water", name: "Borehole Water" },
      { icon: "electricity", name: "Electricity" }
    ],
    images: [
      "/images/igbariam-hero.jpg",
      "/images/igbariam-layout.jpg",
      "/images/igbariam-aerial.jpg"
    ],
    price: "₦8,000,000",
    size: "464SQM",
    landCondition: "100% Dry Land"
  },
  "3": {
    id: "3",
    name: "Luxury City",
    estate: "Luxury City Asaba",
    location: "OPP Wichtech Aluminium Company Asaba",
    description: "Luxury City Asaba is a premium residential estate positioned opposite Wichtech Aluminium Company Asaba, designed for those who appreciate luxury living. The estate offers spacious plots in a serene environment with state-of-the-art facilities and amenities, making it an ideal investment for both residential and commercial purposes.",
    landmarks: {
      location: "OPP Wichtech Aluminium Company Asaba",
      proximities: [
        "10 mins to Asaba International Airport", 
        "5 mins to Asaba Mall"
      ]
    },
    overview: {
      size: "464 sqm per plot",
      landCondition: "100% dry land",
      titleDocument: "Deed of Assignment & Registered Survey"
    },
    features: [
      { icon: "road", name: "Paved Roads" },
      { icon: "security", name: "24/7 Security" },
      { icon: "garden", name: "Landscaped Gardens" },
      { icon: "recreation", name: "Recreational Facilities" }
    ],
    images: [
      "/images/luxury-city-hero.jpg",
      "/images/luxury-city-layout.jpg",
      "/images/luxury-city-aerial.jpg"
    ],
    price: "₦5,000,000",
    size: "464SQM",
    landCondition: "100% Dry Land"
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  // Type-safe check to verify if the id exists in property data
  if (!Object.prototype.hasOwnProperty.call(propertyData, id)) {
    return NextResponse.json({ message: 'Property not found' }, { status: 404 });
  }
  
  return NextResponse.json(propertyData[id]);
}