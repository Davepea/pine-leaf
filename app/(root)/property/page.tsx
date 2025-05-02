'use client'; 
import React from 'react';
import Image from 'next/image';
import EstateCard from '@/components/EstateCard';

const mockEstates = [
  {
    location: 'Umuezeawala Awka South',
    title: 'Platinum Estate Awka',
    price: 3000000,
    srcImage: "/img/property1.jpg",
    size: '464SQM',
    dryLand: '100% Dry Land',
    instantLocation: 'Instant Location',
    type: 'Buy & Build',
  },
  {
    location: 'Direct Opp Ebube Muonso School',
    title: 'Igbarian Phase 1',
    price: 8000000,
    srcImage: "/img/property2.jpg",
    size: '464SQM',
    dryLand: '100% Dry Land',
    instantLocation: 'Instant Location',
    type: 'Buy & Build',
  },
  {
    location: 'OPP WhiteTech Aluminium Company Asaba',
    title: 'Luxury City Asaba',
    price: 5000000,
    srcImage:"/img/property3.jpg",
    size: '464SQM',
    dryLand: '100% Dry Land',
    instantLocation: 'Instant Location',
    type: 'Buy & Build',
  },
  {
    location: 'Umuezeawala Awka South',
    title: 'Platinum Estate Awka',
    price: 3000000,
    srcImage: "/img/property1.jpg",
    size: '464SQM',
    dryLand: '100% Dry Land',
    instantLocation: 'Instant Location',
    type: 'Buy & Build',
  },
  {
    location: 'Direct Opp Ebube Muonso School',
    title: 'Igbarian Phase 1',
    price: 8000000,
    srcImage: "/img/property2.jpg",
    size: '464SQM',
    dryLand: '100% Dry Land',
    instantLocation: 'Instant Location',
    type: 'Buy & Build',
  },
  {
    location: 'OPP WhiteTech Aluminium Company Asaba',
    title: 'Luxury City Asaba',
    price: 5000000,
    srcImage:"/img/property3.jpg",
    size: '464SQM',
    dryLand: '100% Dry Land',
    instantLocation: 'Instant Location',
    type: 'Buy & Build',
  },
  // Add more as needed
];

export default function PropertiesPage() {
  return (
    <section className="bg-white">



       {/* Hero Section */}
            <div className="relative h-64">
              <div className="absolute inset-0">
                <Image
                  src="/img/properties-hero.png"
                  alt="Model house"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  priority
                />
                <div className="absolute inset-0 bg-opacity-50"></div>
              </div>
              <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Properties
                </h1>
                 <p className="small-texts mt-2 !text-white">Explore our available properties</p>

              </div>
            </div>


     <div className='px-[6.1458vw] pb-[6.2vw]'>
     <div className="flex flex-wrap justify-center gap-4 px-6 py-8 ">
        <select className="border rounded px-4 py-2 min-w-[200px]">
          <option>Location (State, City)</option>
        </select>
        <select className="border rounded px-4 py-2 min-w-[200px]">
          <option>Estate Name</option>
        </select>
        <select className="border rounded px-4 py-2 min-w-[200px]">
          <option>Property Type</option>
        </select>
        <button className="bg-[#2F5318] text-white px-6 py-2 rounded">Search</button>
      </div>


      <section className="px-4 sm:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEstates.map((estate, idx) => (
          <EstateCard key={idx} {...estate} />
        ))}
      </section>

      
      <div className="flex justify-center items-center space-x-2 py-8">
        <button className="text-sm text-gray-700">&lt;</button>
        <button className="bg-[#2F5318] text-white px-3 py-1 rounded">1</button>
        <button className="text-sm text-gray-700">2</button>
        <button className="text-sm text-gray-700">3</button>
        <button className="text-sm text-gray-700">...</button>
      </div>
     </div>

   
    </section>
  );
}
