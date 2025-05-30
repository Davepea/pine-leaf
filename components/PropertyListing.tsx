import React, { useState, useEffect } from 'react';
import { propertyService } from '@/services/PropertyService';
import EstateCard from '@/components/EstateCard';
import { Property } from '@/types';
import Link from 'next/link';
import {
  MdArrowOutward,
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

const PropertyListing: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<{
    currentPage: number;
    lastPage: number;
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useState<{
    page?: number;
    query?: string;
    location?: string;
    type?: string;
    min_price?: number;
    max_price?: number;
    per_page?: number;
  }>({
    page: 1,
    per_page: 3, // Limit to 3 per page
  });

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyService.searchProperties(searchParams);

      setProperties(response.data.data);
      setPagination({
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        total: response.data.total,
      });
      setError(null);
    } catch (err: unknown) {
      setError(err.message);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchParamChange = (key: string, value: unknown) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value,
      per_page: 3, // Ensure per_page remains set
    }));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.lastPage) {
      handleSearchParamChange('page', newPage);
    }
  };

  return (
    <section className="">
      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p>Loading properties...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Property Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {properties.map(property => (
          <EstateCard
            key={property.id}
            id={property.id}
            location={property.location}
            title={property.estate_name}
            srcImage={property.images[0] || '/img/default-property.jpg'}
            price={parseFloat(property.price)}
            size={property.size}
            dryLand={property.land_condition === 'dry' ? '100% Dry Land' : 'Check Land Status'}
            instantLocation="Instant Location"
            type={property.type}
          />
        ))}
      </div>

      {/* Pagination */}
      {properties.length > 0 && (
        <div className="flex justify-between items-center mt-8 space-x-4">
          <div className="flex gap-6 items-center">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="text-2xl disabled:opacity-30"
            >
              <MdOutlineArrowBackIos />
            </button>
            <span className="text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.lastPage}
            </span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.lastPage}
              className="text-2xl disabled:opacity-30"
            >
              <MdOutlineArrowForwardIos />
            </button>
          </div>
          <div>
            <Link href="/property">
              <button className="flex items-center gap-2">
                Explore All
                <MdArrowOutward />
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* No Properties Found */}
      {!loading && properties.length === 0 && (
        <div className="text-center py-8">
          <p>No properties found. Try adjusting your search parameters.</p>
        </div>
      )}
    </section>
  );
};

export default PropertyListing;
