'use client'; 
import React from 'react';
import EstateCard from '@/components/EstateCard';

const mockEstates = [
  {
    location: 'Umuezeawala Awka South',
    title: 'Platinum Estate Awka',
    price: 3000000,
    size: '464SQM',
    dryLand: '100% Dry Land',
    instantLocation: 'Instant Location',
    type: 'Buy & Build',
  },
  {
    location: 'Direct Opp Ebube Muonso School',
    title: 'Igbarian Phase 1',
    price: 8000000,
    size: '464SQM',
    dryLand: '100% Dry Land',
    instantLocation: 'Instant Location',
    type: 'Buy & Build',
  },
  {
    location: 'OPP WhiteTech Aluminium Company Asaba',
    title: 'Luxury City Asaba',
    price: 5000000,
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

      <div className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: "url('/your-hero-image.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center">
          <h1 className="large-header">Properties</h1>
          <p className="small-texts mt-2">Explore our available properties</p>
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
        <button className="bg-green-700 text-white px-3 py-1 rounded">1</button>
        <button className="text-sm text-gray-700">2</button>
        <button className="text-sm text-gray-700">3</button>
        <button className="text-sm text-gray-700">...</button>
      </div>
     </div>

   
    </section>
  );
}
