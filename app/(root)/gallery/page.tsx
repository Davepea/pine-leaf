'use client';

import Image from 'next/image';
import { useState } from 'react';

const filters = ['All', 'Award Events', 'Estate Launching', 'Allocation', 'Academy', 'Construction'];

const galleryImages = [
  '/img/gallery/img1.jpg',
  '/img/gallery/img2.jpg',
  '/img/gallery/img3.jpg',
  '/img/gallery/img4.jpg',
  '/img/gallery/img5.jpg',
  '/img/gallery/img6.jpg',
  '/img/gallery/img7.jpg',
  '/img/gallery/img8.jpg',
  '/img/gallery/img9.jpg',
  '/img/gallery/img10.jpg',
  '/img/gallery/img11.jpg',
  '/img/gallery/img12.jpg',
  '/img/gallery/img13.jpg',
  '/img/gallery/img14.jpg',
  '/img/gallery/img15.jpg',
  '/img/gallery/img16.jpg',
  '/img/gallery/img17.jpg',
  '/img/gallery/img18.jpg',
];

const IMAGES_PER_PAGE = 9; // Show 9 images per page (3x3 grid)

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(galleryImages.length / IMAGES_PER_PAGE);

  // Get current page images
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const currentImages = galleryImages.slice(startIndex, startIndex + IMAGES_PER_PAGE);

  // Handle page changes
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of gallery section
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination display
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show current page with context
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src="/img/gallery/gallery-hero.png"
          alt="Gallery Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <p className="text-sm mt-2 max-w-xl">
            A glimpse into our events, estate launches, client experiences, and realtor celebrations.
          </p>
        </div>
      </div>

      <div className='px-[6.1458vw]'>
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 py-6 px-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setCurrentPage(1); // Reset to first page when filter changes
              }}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                activeFilter === filter ? 'bg-[#2F5318] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-8">
          {currentImages.map((src, index) => (
            <div key={startIndex + index} className="relative w-full h-72 rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <Image 
                src={src} 
                alt={`Gallery image ${startIndex + index + 1}`} 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-3 pb-10 text-sm">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded transition-colors ${
              currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            &lt;
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page: number | string, index: number) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
              className={`px-3 py-1 rounded transition-colors ${
                page === currentPage
                  ? 'bg-[#2F5318] text-white'
                  : typeof page === 'number'
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-400 cursor-default'
              }`}
              disabled={typeof page !== 'number'}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded transition-colors ${
              currentPage === totalPages 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            &gt;
          </button>
        </div>

        {/* Page Info */}
        <div className="text-center text-gray-600 text-sm pb-6">
          Showing {startIndex + 1}-{Math.min(startIndex + IMAGES_PER_PAGE, galleryImages.length)} of {galleryImages.length} images
        </div>
      </div>
    </section>
  );
}