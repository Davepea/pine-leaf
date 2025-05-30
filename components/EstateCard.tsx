// components/EstateCard.tsx
import React from 'react';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type EstateCardProps = {
  id?: number;
  name?: string;
  estate_name?: string;
  location?: string;
  price: number | string;
  size?: string;
  land_condition?: string;
  type?: string;
  purpose?: string;
  images?: string[];
  property_features?: string[];
  landmark?: string[];
  description?: string;
  // Legacy props for backward compatibility
  title?: string;
  dryLand?: string;
  instantLocation?: string;
  srcImage?: string;
};

const EstateCard: React.FC<EstateCardProps> = ({
  id,
  name,
  estate_name,
  location,
  price,
  size,
  land_condition,
  type,
  purpose,
  images,
  property_features,
  landmark,
  description,
  // Legacy props
  title,
  dryLand,
  instantLocation,
  srcImage
}) => {
  // Determine image source
  const imageSrc = 
    (images && images.length > 0) 
      ? `https://pineleaflaravel.sunmence.com.ng/public${images[0]}`
      : srcImage 
        ? `https://pineleaflaravel.sunmence.com.ng/public${srcImage}`
        : '/img/placeholder-property.jpg';

  const displayTitle = name || estate_name || title || 'Property';
  const numericPrice = typeof price === 'number' ? price : parseFloat(price);
  const displayPrice = isNaN(numericPrice) ? 'N/A' : numericPrice.toLocaleString();
  
  // Handle location display - API returns location as "1", need to map or use landmark
  const displayLocation = landmark && landmark.length > 0 
    ? landmark[0] // Use first landmark as location
    : location || 'Location not specified';

    console.log(id);
    

  const additionalDetails = [
    size || '464 SQM',
    land_condition || dryLand || '100% Dry Land',
    property_features?.[0] || instantLocation || 'Instant Allocation',
    `${type || 'Land'} - ${purpose || 'Residential'}`
  ];

  return (
    <div className="rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-md transition-shadow bg-white">
      {/* Image */}
      <div className="h-48 bg-gray-200 w-full relative overflow-hidden">
        <Image 
          src={imageSrc} 
          alt={displayTitle} 
          fill 
          className="object-cover h-full w-full" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            e.currentTarget.src = '/img/placeholder-property.jpg';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">{displayLocation}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-800 truncate mr-2">{displayTitle}</h3>
          <span className="font-bold text-green-600 whitespace-nowrap">₦{displayPrice}</span>
        </div>

        {/* Description snippet */}
        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </p>
        )}

        <div className="flex flex-wrap gap-1 text-xs text-gray-600 my-3 border-t border-b py-2">
          {additionalDetails.map((detail, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="px-1">|</span>}
              <span className="lg:text-xs md:text-[10px]">{detail}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Navigation Link */}
        {id ? (
          <Link 
            href={`/property/${id}`} 
            className="text-green-700 text-sm font-semibold hover:underline block cursor-pointer transition-colors hover:text-green-800"
          >
            View Details →
          </Link>
        ) : (
          <span className="text-gray-400 text-sm font-semibold cursor-not-allowed">
            View Details →
          </span>
        )}
      </div>
    </div>
  );
};

export default EstateCard;