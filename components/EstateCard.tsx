import React from 'react';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

type EstateCardProps = {
  location: string;
  title: string;
  price: number;
  size: string;
  dryLand: string;
  instantLocation: string;
  type: string;
  srcImage: string;
};

const EstateCard: React.FC<EstateCardProps> = ({
  location,
  title,
  price,
  size,
  dryLand,
  instantLocation,
  type,
  srcImage
}) => {
  return (
    <div className="rounded-xl border-2 border-gray-200 overflow-hidden  hover:shadow-md transition-shadow bg-white">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200 w-full relative overflow-hidden"  >
          <div>
        <Image src={srcImage} alt='property' fill className="object-cover h-full w-full" />

          </div>
      </div>

      {/* Content */}
      <div className="p-2">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
          <span className="font-bold text-gray-800">₦{price.toLocaleString()}</span>
        </div>

        <div className="flex  gap-1 !text-xs text-gray-600 my-3 border-t border-b py-2">
          <span className='lg:text-xs md:text-[10px]'>{size}</span>
          <span className="px-1">|</span>
          <span className='lg:text-xs md:text-[10px]'>{dryLand}</span>
          <span className="px-1">|</span>
          <span className='lg:text-xs md:text-[10px]'>{instantLocation}</span>
          <span className="px-1">|</span>
          <span className='lg:text-xs md:text-[10px]'>{type}</span>
        </div>

        <button className="text-green-700 text-sm font-semibold mt-2 hover:underline">
          More Details →
        </button>
      </div>
    </div>
  );
};

export default EstateCard;
