import React from 'react';
import { MapPin } from 'lucide-react';

type EstateCardProps = {
  location: string;
  title: string;
  price: number;
  size: string;
  dryLand: string;
  instantLocation: string;
  type: string;
};

const EstateCard: React.FC<EstateCardProps> = ({
  location,
  title,
  price,
  size,
  dryLand,
  instantLocation,
  type,
}) => {
  return (
    <div className="rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200" />

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
          <span className="font-bold text-gray-800">₦{price.toLocaleString()}</span>
        </div>

        <div className="flex  gap-1 text-xs text-gray-600 my-3 border-t border-b py-2">
          <span>{size}</span>
          <span className="px-1">|</span>
          <span>{dryLand}</span>
          <span className="px-1">|</span>
          <span>{instantLocation}</span>
          <span className="px-1">|</span>
          <span>{type}</span>
        </div>

        <button className="text-green-700 text-sm font-semibold mt-2 hover:underline">
          More Details →
        </button>
      </div>
    </div>
  );
};

export default EstateCard;
