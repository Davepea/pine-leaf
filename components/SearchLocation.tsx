'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

const budgetOptions = [
  { label: '₦0.00 - ₦5,000,000', min: 0, max: 5000000 },
  { label: '₦5M - ₦10M', min: 5000000, max: 10000000 },
  { label: '₦10M - ₦20M', min: 10000000, max: 20000000 },
  { label: '₦20M+', min: 20000000, max: null },
];

const SearchLocation = () => {
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const router = useRouter();

  const handleSearchClick = () => {
    const query = new URLSearchParams();

    if (location) query.set('location', location);

    if (budget) {
      const selected = budgetOptions.find((opt) => opt.label === budget);
      if (selected) {
        query.set('min_price', String(selected.min));
        if (selected.max !== null) {
          query.set('max_price', String(selected.max));
        }
      }
    }

    router.push(`/property/sort?${query.toString()}`);
  };

  return (
    <div className="bg-white max-w-[647px] p-[12px] rounded-xl h-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <div className="md:col-span-3">
          <input
            type="search"
            placeholder="Enter Location or City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:border-0 md:border-r-2 border-b-2 border-[#0000002B] !h-[44px]"
          />
        </div>
        <div className="md:col-span-2 flex gap-4 items-center justify-between">
          <div className="flex md:flex-col items-start gap-1">
            <span>Budget Range</span>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className=" rounded text-gray-400"
            >
              <option value="" className=' !text-gray-500'>Select Budget</option>
              {budgetOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center items-center h-full">
            <Button
              className="text-white bg-[#2F5318] h-full w-full md:!px-[20px] md:py-[15px]"
              onClick={handleSearchClick}
            >
              <SearchIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchLocation;
