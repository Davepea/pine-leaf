'use client';

import Image from 'next/image';
// import Link from 'next/link';
import { useState } from 'react';

const filters = ['All', 'Award Events', 'Estate Launching', 'Allocation', 'Academy', 'Construction'];

const galleryImages = [
  '/gallery/img1.jpg',
  '/gallery/img2.jpg',
  '/gallery/img3.jpg',
  '/gallery/img4.jpg',
  '/gallery/img5.jpg',
  '/gallery/img6.jpg',
  '/gallery/img7.jpg',
  '/gallery/img8.jpg',
  '/gallery/img9.jpg',
  '/gallery/img10.jpg',
  '/gallery/img11.jpg',
  '/gallery/img12.jpg',
  '/gallery/img13.jpg',
  '/gallery/img14.jpg',
  '/gallery/img15.jpg',
  '/gallery/img16.jpg',
  '/gallery/img17.jpg',
  '/gallery/img18.jpg',
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src="/gallery/hero.jpg"
          alt="Gallery Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <p className="text-sm mt-2 max-w-xl">
            A glimpse into our events, estate launches, client experiences, and realtor celebrations.
          </p>
        </div>
      </div>


    <div className='px-[6.1458vw] '>
    <div className="flex flex-wrap justify-center gap-4 py-6 px-4 ">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full border text-sm ${
              activeFilter === filter ? 'bg-[#2F5318] text-white' : 'text-gray-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-8">
        {galleryImages.map((src, index) => (
          <div key={index} className="relative w-full h-72 rounded overflow-hidden shadow-md">
            <Image src={src} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

    
      <div className="flex justify-center items-center space-x-3 pb-10 text-sm">
        <button>&lt;</button>
        <button className="bg-green-700 text-white px-3 py-1 rounded">1</button>
        <button>2</button>
        <button>3</button>
        <span>...</span>
        <button>&gt;</button>
      </div>

    </div>
     
    </section>
  );
}
