'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import EstateCard from '@/components/EstateCard';
import { Property } from '@/types';
import { propertyService } from '@/services/PropertyService';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    query: '',
    location: '',
    estate_name: '',
    property_type: ''
  });

  const fetchProperties = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await propertyService.searchProperties(searchParams);
      setProperties(result.data.data);
      setPagination({
        current_page: result.data.current_page,
        last_page: result.data.last_page,
        total: result.data.total
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => ({ ...prev, page: newPage }));
  };

  const updateFilter = (field: string, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      page: 1,
      [field]: value
    }));
  };

  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="relative h-64">
        <div className="absolute inset-0">
          <Image
            src="/img/properties-hero.png"
            alt="Model house"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Properties</h1>
          <p className="small-texts mt-2 text-white">Explore our available properties</p>
        </div>
      </div>

      <div className='px-[6.1458vw] pb-[6.2vw]'>
        {/* Search Filters */}
        <div className="flex flex-wrap justify-center gap-4 px-6 py-8">
          <select 
            className="border rounded px-4 py-2 min-w-[200px]"
            value={searchParams.location}
            onChange={(e) => updateFilter('location', e.target.value)}
          >
            <option value="">Location (State, City)</option>
            <option value="Enugu State">Enugu State</option>
            <option value="Anambra State">Anambra State</option>
          </select>

          <select 
            className="border rounded px-4 py-2 min-w-[200px]"
            value={searchParams.estate_name}
            onChange={(e) => updateFilter('estate_name', e.target.value)}
          >
            <option value="">Estate Name</option>
            <option value="Oganiru Pineleaf Estate">Oganiru Pineleaf Estate</option>
          </select>

          <select 
            className="border rounded px-4 py-2 min-w-[200px]"
            value={searchParams.property_type}
            onChange={(e) => updateFilter('property_type', e.target.value)}
          >
            <option value="">Property Type</option>
            <option value="land">Land</option>
            <option value="residential">Residential</option>
          </select>

          <button 
            className="bg-[#2F5318] text-white px-6 py-2 rounded"
            onClick={() => fetchProperties()}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="alert alert-error shadow-lg mb-6 mx-auto max-w-4xl">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!isLoading && properties.length === 0 && !error && (
          <div className="text-center text-gray-500 py-8">No properties found.</div>
        )}

        {/* Properties Grid */}
        <section className="px-4 sm:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <EstateCard key={property.id} {...property} />
          ))}
        </section>
        
        {/* Pagination */}
        {pagination.last_page > 1 && (
          <div className="flex justify-center items-center space-x-2 py-8">
            <button 
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className="text-sm text-gray-700 disabled:opacity-50"
            >
              &lt;
            </button>

            {[...Array(pagination.last_page)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`text-sm px-3 py-1 rounded ${
                  pagination.current_page === index + 1 
                    ? 'bg-[#2F5318] text-white' 
                    : 'text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button 
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className="text-sm text-gray-700 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
