'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import EstateCard from '@/components/EstateCard';
import { Property } from '@/types';
import { propertyService } from '@/services/PropertyService';

export default function PropertiesSortPage() {
    const urlParams = useSearchParams();

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
        location: urlParams.get('location') || '',
        estate_name: '',
        property_type: '',
        min_price: urlParams.get('min_price') || '',
        max_price: urlParams.get('max_price') || '',
    });
    const [showMobileFilters, setShowMobileFilters] = useState(false);

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

    const clearFilters = () => {
        setSearchParams({
            page: 1,
            query: '',
            location: '',
            estate_name: '',
            property_type: '',
            min_price: urlParams.get('min_price') || '',
            max_price: urlParams.get('max_price') || '',
        });
        setShowMobileFilters(false);
    };

    return (
        <section className="bg-white">
            <div className="relative h-[464px]">
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
                    <h1 className="head-1 text-white ">Properties</h1>
                    <p className="small-texts mt-2 !text-white">Explore our available properties</p>
                </div>
            </div>

            <div className='px-[6.1458vw] pb-[6.2vw] py-20'>
                {/* Search Filters */}
                <div className="px-[20] py-[20] md:border rounded-[10px] mb-10 md:border-[#2F5318]">
                    {/* Desktop Filter Bar */}
                    <div className="hidden md:grid md:grid-cols-4 flex-wrap gap-4">
                        <select 
                            className="border w-full shadow-2xl border-gray-300 rounded-lg px-4 py-3 min-w-[200px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent"
                            value={searchParams.location}
                            onChange={(e) => updateFilter('location', e.target.value)}
                        >
                            <option value="">Location (State, City)</option>
                            <option value="Enugu State">Enugu State</option>
                            <option value="Anambra State">Anambra State</option>
                        </select>

                        <select 
                            className="border shadow-2xl border-gray-300 rounded-lg px-4 py-3 min-w-[200px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent"
                            value={searchParams.estate_name}
                            onChange={(e) => updateFilter('estate_name', e.target.value)}
                        >
                            <option value="">Estate Name</option>
                            <option value="Oganiru Pineleaf Estate">Oganiru Pineleaf Estate</option>
                        </select>

                        <select 
                            className="border shadow-2xl border-gray-300 rounded-lg px-4 py-3 min-w-[200px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent"
                            value={searchParams.property_type}
                            onChange={(e) => updateFilter('property_type', e.target.value)}
                        >
                            <option value="">Property Type</option>
                            <option value="land">Land</option>
                            <option value="residential">Residential</option>
                        </select>

                        <button 
                            className="bg-[#2F5318] shadow-2xl text-white px-8 py-3 rounded-lg font-medium hover:bg-[#3F6328] transition-colors"
                            onClick={() => fetchProperties()}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Searching...' : 'Search'}
                        </button>
                    </div>

                    {/* Mobile Filter Bar */}
                    <div className="md:hidden shadow-2xl border border-gray-300 rounded-md">
                        <div className="flex gap-3">
                            <button
                                className="flex-1  rounded-lg px-4 py-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent flex items-center justify-between"
                                onClick={() => setShowMobileFilters(!showMobileFilters)}
                            >
                                <span>Filter</span>
                                <svg 
                                    className={`w-5 h-5 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <button 
                                className="bg-[#2F5318] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#3F6328] transition-colors"
                                onClick={() => fetchProperties()}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Searching...' : 'Search'}
                            </button>
                        </div>

                        {/* Mobile Filter Dropdown */}
                        {showMobileFilters && (
                            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Location (State, City)
                                        </label>
                                        <select 
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent"
                                            value={searchParams.location}
                                            onChange={(e) => updateFilter('location', e.target.value)}
                                        >
                                            <option value="">All Locations</option>
                                            <option value="Enugu State">Enugu State</option>
                                            <option value="Anambra State">Anambra State</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Estate Name
                                        </label>
                                        <select 
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent"
                                            value={searchParams.estate_name}
                                            onChange={(e) => updateFilter('estate_name', e.target.value)}
                                        >
                                            <option value="">All Estates</option>
                                            <option value="Oganiru Pineleaf Estate">Oganiru Pineleaf Estate</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Property Type
                                        </label>
                                        <select 
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F5318] focus:border-transparent"
                                            value={searchParams.property_type}
                                            onChange={(e) => updateFilter('property_type', e.target.value)}
                                        >
                                            <option value="">All Types</option>
                                            <option value="land">Land</option>
                                            <option value="residential">Residential</option>
                                        </select>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                            onClick={clearFilters}
                                        >
                                            Clear All
                                        </button>
                                        <button
                                            className="flex-1 bg-[#2F5318] text-white px-4 py-2 rounded-lg hover:bg-[#3F6328] transition-colors"
                                            onClick={() => setShowMobileFilters(false)}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
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

                {/* Property Grid */}
                <section className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                className={`text-sm px-3 py-1 rounded ${pagination.current_page === index + 1
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