// components/EstateCard.tsx
import React from 'react';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type EstateCardProps = {
  id?: number;
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
};

const EstateCard: React.FC<EstateCardProps> = ({
  id,
  location,
  name,
  title,
  price,
  size,
  dryLand,
  land_condition,
  instantLocation,
  type,
  purpose,
  srcImage,
  images,
  property_features
}) => {
  // Determine image source
  const imageSrc = 
    (images && images.length > 0) 
      ? `https://pineleaflaravel.sunmence.com.ng${images[0]}` 
      : srcImage 
      || '/img/placeholder-property.jpg';

  const displayTitle = name || title || 'Property';
  const numericPrice = typeof price === 'number' ? price : parseFloat(price);
  const displayPrice = isNaN(numericPrice) ? 'N/A' : numericPrice.toLocaleString();
  const displayLocation = location || 'Location not specified';

  const additionalDetails = [
    size || dryLand || '464 SQM',
    land_condition || dryLand || '100% Dry Land',
    instantLocation || property_features?.[0] || 'Instant Location',
    type || purpose || 'Buy & Build'
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
        />
      </div>

      {/* Content */}
      <div className="p-2">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {displayLocation}
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-800">{displayTitle}</h3>
          <span className="font-bold text-gray-800">₦{displayPrice}</span>
        </div>

        <div className="flex gap-1 !text-xs text-gray-600 my-3 border-t border-b py-2">
          {additionalDetails.map((detail, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="px-1">|</span>}
              <span className="lg:text-xs md:text-[10px]">{detail}</span>
            </React.Fragment>
          ))}
        </div>

        {id ? (
          <Link href={`/property/${id}`} passHref>
            <span className="text-green-700 text-sm font-semibold mt-2 hover:underline block">
              More Details →
            </span>
          </Link>
        ) : (
          <span className="text-green-700 text-sm font-semibold mt-2">More Details →</span>
        )}
      </div>
    </div>
  );
};

export default EstateCard;
