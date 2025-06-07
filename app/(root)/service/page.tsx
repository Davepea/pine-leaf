'use client';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdCheckmark } from 'react-icons/io'


const Services: NextPage = () => {
    const handleDownload = () => {
    const link = document.createElement('a');
      link.href = '/img/invest-plan.jpg'; 
      link.download = 'investment-brochure.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Our Services - Pineleaf Estates</title>
        <meta name="description" content="Explore our comprehensive real estate services including property development, land banking, land surveying and real estate consultancy." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     

      {/* Hero Section */}
      <div className="relative h-[464px]">
        <div className="absolute inset-0">
          <Image
            src="/img/service.png"
            alt="Model house"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
          <div className="absolute inset-0 bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center">
          <h1 className="head-1 text-white">
            Our Services
          </h1>
        </div>
      </div>

      {/* Services Sections */}
      <div className="">
        {/* Property Development Section */}
        <div className="grid md:grid-cols-2 gap-[93px]  section">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/serv-1.png"
              alt="Property development"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className=" rounded-lg">
            <h2 className="bold-para-1 text-gray-800 mb-[2px]">Property Development & Sales</h2>
            <p className="para-4 text-[#2F5318B2] mb-[20px] ">
              Whether you&apos;re building a dream home, commercial project, or developing land for sale, we provide:
            </p>
            <ul className="space-y-[10px] mb-5">
              <li className="flex items-start">
              <IoMdCheckmark size={24} className=" text-[#2F5318] mr-2 flex-shrink-0" />
                <span className='para-3 text-[#000000CC]'>Custom property development based on your needs.</span>
              </li>
              <li className="flex items-start">
              <IoMdCheckmark size={24} className=" text-[#2F5318] mr-2 flex-shrink-0" />
                <span className='para-3 text-[#000000CC]'>Expert project management from start to finish.</span>
              </li>
              <li className="flex items-start">
              <IoMdCheckmark size={24} className=" text-[#2F5318] mr-2 flex-shrink-0" />
                <span className='para-3 text-[#000000CC]'>Secure documentation to ensure legal safety.</span>
              </li>
            </ul>
            <h3 className="bold-para-2 leading-[25.2px] mb-3">Why Choose Us?</h3>
            <ul className="space-y-2 mb-[30px]">
              <li className="flex items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-gray-800 mr-3"></div>
                <span className='para-3 text-[#000000CC]'>20+ years of real estate excellence</span>
              </li>
              <li className="flex items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-gray-800 mr-3"></div>
                <span className='para-3 text-[#000000CC]'>High-quality construction standards</span>
              </li>
              <li className="flex items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-gray-800 mr-3"></div>
                <span className='para-3 text-[#000000CC]'>Transparent & professional service</span>
              </li>
            </ul>
            <Link href="/book-consultation">
              <span className="inline-block bg-white border border-[#2F5318] text-[#2F5318] px-6 py-2 rounded-md hover:bg-[#2F5318] hover:text-white transition duration-300">
                Book for Consultation
              </span>
            </Link>
          </div>
        </div>

        {/* Land Banking Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center md:px-[120px] px-[25px] pt-[60px] ">
          <div className="order-2 md:order-1  p-8 rounded-lg">
            <h2 className="bold-para-1 text-gray-800 mb-[2px]">Real Estate Investment & Land Banking</h2>
            <p className="para-4 text-[#2F5318B2] mb-[20px]">
              Investing in real estate is one of the smartest ways to build wealth. We offer:
            </p>
            <ul className="space-y-[10px] mb-6">
              <li className="flex items-start">
              <IoMdCheckmark size={24} className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span className='para-3 text-[#000000CC]'>Land banking opportunities with high appreciation value.</span>
              </li>
              <li className="flex items-start">
              <IoMdCheckmark size={24} className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span className='para-3 text-[#000000CC]'>Secure investments with flexible payment options.</span>
              </li>
              <li className="flex items-start">
              <IoMdCheckmark size={24} className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span className='para-3 text-[#000000CC]'>Strategic advisory to help you maximize returns.</span>
              </li>
            </ul>
            <h3 className="bold-para-2 leading-[25.2px] mb-3">Why Choose Us?</h3>
            <ul className="space-y-[10px] mb-[30px]">
              <li className="flex items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-gray-800 mr-3"></div>
                <span className='para-3 text-[#000000CC]'>We select prime locations in South-South & South-East Nigeria.</span>
              </li>
              <li className="flex items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-gray-800 mr-3"></div>
                <span className='para-3 text-[#000000CC]'>Secure & legally verified investment options.</span>
              </li>
              <li className="flex items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-gray-800 mr-3"></div>
                <span className='para-3 text-[#000000CC]'>Guidance from expert real estate consultants.</span>
              </li>
            </ul>
            
              <button className="inline-block bg-white border border-[#2F5318] text-[#2F5318] px-6 py-2 rounded-md hover:bg-[#2F5318] hover:text-white transition duration-300"
              onClick={handleDownload}
              >
                Download Investment Plan
              </button>
            
          </div>
          <div className="order-1 md:order-2 rounded-lg overflow-hidden">
            <Image
              src="/img/serv-2.png"
              alt="Land banking investment"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Land Surveying Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center md:px-[120px] px-[25px] pt-[60px]">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/serv-3.png"
              alt="Land surveying"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className=" p-8 rounded-lg">
            <h2 className="bold-para-1 text-gray-800 mb-[2px]">Land Surveying & Title Verification</h2>
            <p className="para-4 text-[#2F5318B2] mb-[20px]">
              Ensure your land ownership is legally secured with our expert documentation services:
            </p>
            <ul className="space-y-[10px] mb-6">
              <li className="flex items-start">
              <IoMdCheckmark size={24} className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span className='para-3 text-[#000000CC]'>Title Verification – Confirm land authenticity & ownership.</span>
              </li>
              <li className="flex items-start">
              <IoMdCheckmark size={24} className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span className='para-3 text-[#000000CC]'>Survey Plan Assistance – Proper land boundary mapping.</span>
              </li>
              <li className="flex items-start">
              <IoMdCheckmark size={24} className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span className='para-3 text-[#000000CC]'>Certificate of Occupancy (C of O) & Governor&apos;s Consent Processing.</span>
              </li>
            </ul>
            <h3 className="bold-para-2 leading-[25.2px] mb-3">Why Choose Us?</h3>
            <ul className="space-y-[10px] mb-[30px]">
              <li className="flex items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-gray-800 mr-3"></div>
                <span className='para-3 text-[#000000CC]'>We prevent fraudulent land purchases.</span>
              </li>
              <li className="flex items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-gray-800 mr-3"></div>
                <span className='para-3 text-[#000000CC]'>We help secure all necessary legal documents.</span>
              </li>
              <li className="flex items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-gray-800 mr-3"></div>
                <span className='para-3 text-[#000000CC]'>Your investment remains protected for the future.</span>
              </li>
            </ul>
            <Link href="/verify-land-title">
              <span className="inline-block bg-white border border-[#2F5318] text-[#2F5318] px-6 py-2 rounded-md hover:bg-[#2F5318] hover:text-white transition duration-300">
                Verify Your Land Title
              </span>
            </Link>
          </div>
        </div>

        {/* Consultancy Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center md:px-[120px] px-[25px] pt-[60px]">
          <div className="order-2 md:order-1 p-8 rounded-lg">
            <h2 className="bold-para-1 text-gray-800 mb-[2px]">Real Estate Consultancy & Training</h2>
            <p className="para-4 text-[#2F5318B2] mb-[20px]">
              We empower individuals & professionals with real estate education and expert advice. Services include:
            </p>
            <ul className="space-y-[10px] mb-6">
              <li className="flex items-start">
              <IoMdCheckmark size={24} className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span className='para-3 text-[#000000CC]'>One-on-one real estate consultations.</span>
              </li>
              <li className="flex items-start">
              <IoMdCheckmark size={24} className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span className='para-3 text-[#000000CC]'>Realtor training through Pineleaf Realtors Reward Mechanism (PRRM).</span>
              </li>
              <li className="flex items-start">
              <IoMdCheckmark size={24} className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span className='para-3 text-[#000000CC]'>Workshops & investment strategy planning.</span>
              </li>
            </ul>
            <h3 className="bold-para-2 leading-[25.2px] mb-3">Why Choose Us?</h3>
            <ul className="space-y-[10px] mb-[30px]">
              <li className="flex items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-gray-800 mr-3"></div>
                <span className='para-3 text-[#000000CC]'>Access to market insights & investment forecasts.</span>
              </li>
              <li className="flex items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-gray-800 mr-3"></div>
                <span className='para-3 text-[#000000CC]'>Comprehensive training to become a successful realtor.</span>
              </li>
              <li className="flex items-center">
                <div className="w-[14px] h-[14px] rounded-full bg-gray-800 mr-3"></div>
                <span className='para-3 text-[#000000CC]'>Earn up to 10% commission through our PRRM program.</span>
              </li>
            </ul>
            <Link href="/book-consultation">
              <span className="inline-block bg-white border border-[#2F5318] text-[#2F5318] px-6 py-2 rounded-md hover:bg-[#2F5318] hover:text-white transition duration-300">
                Book for Consultation
              </span>
            </Link>
          </div>
          <div className="order-1 md:order-2 rounded-lg overflow-hidden">
            <Image
              src="/img/serv-4.png"
              alt="Real estate training"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Services;