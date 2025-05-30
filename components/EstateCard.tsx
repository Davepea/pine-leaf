// components/EstateCard.tsx
import React from 'react';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';

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
  const displaySize = size || 'size';
  const displayLocationCon = land_condition || 'land-condition'
  

  console.log(land_condition);
  
  // Handle location display - API returns location as "1", need to map or use landmark
  const displayLocation = landmark && landmark.length > 0 
    ? landmark[0] // Use first landmark as location
    : location || 'Location not specified';

    console.log(id);
    

  const additionalDetails = [
    size || 'size',
    land_condition || dryLand || 'land-cond',
    property_features?.[1] || instantLocation || 'prop-feat',
    `${type || 'Land'} - ${purpose || 'Res'}`
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
      <div className="p-3">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">{displayLocation}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-800 truncate mr-2">{displayTitle}</h3>
          <span className="font-bold text-[#000000CC] whitespace-nowrap">₦{displayPrice}</span>
        </div>

        {/* Description snippet */}
        {description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </p>
        )}

        <div className="flex items-center gap-1 text-xs text-gray-600 my-3 border-t-2 border-b-2 py-2 border-[#2f53183f]  ">
          {additionalDetails.map((detail, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="px-1 text-xl text-gray-300">|</span>}
              <span className="lg:text-sm md:text-[14px] truncate">{detail}</span>
            </React.Fragment>
          ))}
         
        </div>

        {/* Navigation Link */}
        {id ? (
          <Link 
            href={`/property/${id}`} 
            className="text-[#2F5318] text-[16px] flex font-[700] hover:underline text-center  justify-center items-center gap-[6.5px] cursor-pointer transition-colors hover:text-[#2e3928] py-[10px]"
          >
            More Details 
            <MdArrowOutward/>
          </Link>
        ) : (
          <span className="text-gray-400 text-[16px] font-[700] gap-[6.5px] cursor-not-allowed text-center flex justify-center items-center">
            More Details 
            <MdArrowOutward/>
          </span>
        )}
      </div>
    </div>
  );
};

export default EstateCard;