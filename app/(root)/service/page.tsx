import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheck} from 'react-icons/fa';

const Services: NextPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Our Services - Pineleaf Estates</title>
        <meta name="description" content="Explore our comprehensive real estate services including property development, land banking, land surveying and real estate consultancy." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     

      {/* Hero Section */}
      <div className="relative h-64">
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
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Our Services
          </h1>
        </div>
      </div>

      {/* Services Sections */}
      <div className="py-12  max-w-7xl mx-auto px-[6.2vw]">
        {/* Property Development Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/serv-1.png"
              alt="Property development"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="bg-green-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Property Development & Sales</h2>
            <p className="text-gray-600 mb-4">
              Whether you&apos;re building a dream home, commercial project, or developing land for sale, we provide:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Custom property development based on your needs.</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Expert project management from start to finish.</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Secure documentation to ensure legal safety.</span>
              </li>
            </ul>
            <h3 className="text-lg font-semibold mb-3">Why Choose Us?</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-800 mr-3"></div>
                <span>20+ years of real estate excellence</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-800 mr-3"></div>
                <span>High-quality construction standards</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-800 mr-3"></div>
                <span>Transparent & professional service</span>
              </li>
            </ul>
            <Link href="/contact-us">
              <span className="inline-block bg-white border border-[#2F5318] text-[#2F5318] px-6 py-2 rounded-md hover:bg-[#2F5318] hover:text-white transition duration-300">
                Book for Consultation
              </span>
            </Link>
          </div>
        </div>

        {/* Land Banking Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="order-2 md:order-1 bg-green-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Real Estate Investment & Land Banking</h2>
            <p className="text-gray-600 mb-4">
              Investing in real estate is one of the smartest ways to build wealth. We offer:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Land banking opportunities with high appreciation value.</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Secure investments with flexible payment options.</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Strategic advisory to help you maximize returns.</span>
              </li>
            </ul>
            <h3 className="text-lg font-semibold mb-3">Why Choose Us?</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-800 mr-3"></div>
                <span>We select prime locations in South-South & South-East Nigeria.</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-800 mr-3"></div>
                <span>Secure & legally verified investment options.</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-800 mr-3"></div>
                <span>Guidance from expert real estate consultants.</span>
              </li>
            </ul>
            <Link href="/investment-plan">
              <span className="inline-block bg-white border border-[#2F5318] text-[#2F5318] px-6 py-2 rounded-md hover:bg-[#2F5318] hover:text-white transition duration-300">
                Download Investment Plan
              </span>
            </Link>
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
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/serv-3.png"
              alt="Land surveying"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="bg-green-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Land Surveying & Title Verification</h2>
            <p className="text-gray-600 mb-4">
              Ensure your land ownership is legally secured with our expert documentation services:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Title Verification – Confirm land authenticity & ownership.</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Survey Plan Assistance – Proper land boundary mapping.</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Certificate of Occupancy (C of O) & Governor&apos;s Consent Processing.</span>
              </li>
            </ul>
            <h3 className="text-lg font-semibold mb-3">Why Choose Us?</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-800 mr-3"></div>
                <span>We prevent fraudulent land purchases.</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-800 mr-3"></div>
                <span>We help secure all necessary legal documents.</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-800 mr-3"></div>
                <span>Your investment remains protected for the future.</span>
              </li>
            </ul>
            <Link href="/contact-us">
              <span className="inline-block bg-white border border-[#2F5318] text-[#2F5318] px-6 py-2 rounded-md hover:bg-[#2F5318] hover:text-white transition duration-300">
                Verify Your Land Title
              </span>
            </Link>
          </div>
        </div>

        {/* Consultancy Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 bg-green-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Real Estate Consultancy & Training</h2>
            <p className="text-gray-600 mb-4">
              We empower individuals & professionals with real estate education and expert advice. Services include:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>One-on-one real estate consultations.</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Realtor training through Pineleaf Realtors Reward Mechanism (PRRM).</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Workshops & investment strategy planning.</span>
              </li>
            </ul>
            <h3 className="text-lg font-semibold mb-3">Why Choose Us?</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-800 mr-3"></div>
                <span>Access to market insights & investment forecasts.</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-800 mr-3"></div>
                <span>Comprehensive training to become a successful realtor.</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-800 mr-3"></div>
                <span>Earn up to 10% commission through our PRRM program.</span>
              </li>
            </ul>
            <Link href="/contact-us">
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