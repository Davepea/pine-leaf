import { NextResponse } from 'next/server';

// Define interface for similar property
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

// Define type for similarPropertiesData
type SimilarPropertiesRecord = Record<string, SimilarProperty[]>;

// Mock similar properties data
const similarPropertiesData: SimilarPropertiesRecord = {
  "1": [
    {
      id: "1",
      title: "Platinum Estate Awka",
      location: "Umuawulu Awka South",
      price: "₦3,000,000",
      size: "464SQM",
      landCondition: "100% Dry Land",
      tags: ["Instant Location", "Buy & Build"],
      image: "/images/platinum-estate-thumbnail.jpg"
    },
    {
      id: "2",
      title: "Igbariam Phase 1",
      location: "Direct OPP Ebube Muonso School",
      price: "₦8,000,000",
      size: "464SQM",
      landCondition: "100% Dry Land",
      tags: ["Instant Location", "Buy & Build"],
      image: "/images/igbariam-thumbnail.jpg"
    },
    {
      id: "3",
      title: "Luxury City Asaba",
      location: "OPP Wichtech Aluminium Company Asaba",
      price: "₦5,000,000",
      size: "464SQM",
      landCondition: "100% Dry Land",
      tags: ["Instant Location", "Buy & Build"],
      image: "/images/luxury-city-thumbnail.jpg"
    }
  ],
  "2": [
    {
      id: "1",
      title: "Platinum Estate Awka",
      location: "Umuawulu Awka South",
      price: "₦3,000,000",
      size: "464SQM",
      landCondition: "100% Dry Land",
      tags: ["Instant Location", "Buy & Build"],
      image: "/images/platinum-estate-thumbnail.jpg"
    },
    {
      id: "2",
      title: "Igbariam Phase 1",
      location: "Direct OPP Ebube Muonso School",
      price: "₦8,000,000",
      size: "464SQM",
      landCondition: "100% Dry Land",
      tags: ["Instant Location", "Buy & Build"],
      image: "/images/igbariam-thumbnail.jpg"
    }
  ]
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  // Type-safe check for property existence
  if (!Object.prototype.hasOwnProperty.call(similarPropertiesData, id)) {
    return NextResponse.json({ message: 'Property not found' }, { status: 404 });
  }
  
  return NextResponse.json(similarPropertiesData[id]);
}