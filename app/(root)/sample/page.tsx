import React from 'react';
import { Search, ChevronDown, ChevronRight, Star } from 'lucide-react';

// Mock SearchLocation component
const SearchLocation = () => {
  return (
    <div className="flex max-w-xl w-full rounded-lg overflow-hidden shadow-md">
      <input 
        type="text" 
        placeholder="Search location or city..." 
        className="flex-1 py-4 px-6 outline-none"
      />
      <button className="bg-[#2F5318] text-white px-6 py-4 flex items-center gap-2">
        <Search size={18} />
        <span>Search</span>
      </button>
    </div>
  );
};

// Mock EstateCard component
const EstateCard = ({ location, title, price, size, dryLand, instantLocation, type }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white">
      <div className="relative h-56 bg-gray-200">
        {/* Placeholder for property image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Property Image
        </div>
        <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 text-xs font-medium">
          {type}
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{location}</p>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="font-bold text-[#2F5318] text-xl mb-3">₦{price.toLocaleString()}</p>
        
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-gray-100 px-2 py-1 rounded">{size}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{dryLand}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{instantLocation}</span>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 bg-[#E6FFF6] px-6 md:px-12 lg:px-24 grid items-end relative">
        <div className="py-12 lg:py-24 relative z-10 flex flex-col gap-6 md:gap-14">
          <div className="max-w-2xl">
            <div className="flex flex-col gap-5 md:gap-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Building Legacies, one Property at a Time</h1>
              <p className="text-[#000000CC] text-base md:text-lg max-w-md">
                Your trusted partner in real estate investments, helping you secure profitable lands in South-South and South-East Nigeria.
              </p>
            </div>
          </div>
          <div>
            <SearchLocation />
            <p className="text-sm md:text-base pt-3 text-gray-500">
              Input your preferred location or city and <a href="#" className="text-[#2F5318] font-semibold">Explore</a> our <a href="#" className="text-[#2F5318] font-semibold">Properties</a>
            </p>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 lg:w-2/5 overflow-hidden hidden md:block">
          {/* Placeholder for hero image */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Hero Image</span>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="flex flex-col items-center py-16 md:py-20 px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          What sets us apart
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center max-w-7xl w-full">
          <div className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-lg bg-gray-200 aspect-video">
            {/* Placeholder for image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              What Sets Us Apart Image
            </div>
          </div>

          <div className="flex flex-col gap-8 md:gap-10 w-full lg:w-1/2">
            <div className="flex gap-4 md:gap-6 items-start">
              <div className="h-10 w-10 bg-gray-100 text-black rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg lg:text-xl mb-2">20+ Years of Real Estate Excellence</h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  With 20+ years of real estate experience, Pineleaf Estates is known for delivering trust, value, and results.
                  We&apos;re committed to consistency, professionalism, and client satisfaction.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 items-start">
              <div className="h-10 w-10 bg-gray-100 text-black rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg lg:text-xl mb-2">Secured and Verified Land Deals</h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  All our properties are legally verified, properly documented, and free from disputes — giving you peace of mind with every purchase.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 items-start">
              <div className="h-10 w-10 bg-gray-100 text-black rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg lg:text-xl mb-2">Innovative Realtors Reward System (PRRM)</h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  Our PRRM program rewards realtors with up to 10% commission and exclusive benefits. It&apos;s a simple, powerful way to earn through referrals and real estate sales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid md:grid-cols-3 gap-6 md:gap-8 px-6 md:px-12 lg:px-24 py-12 md:py-16 text-center bg-[#E6FFF6]">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">1,819+</h2>
          <p className="font-semibold text-lg md:text-xl mb-2">Happy Landowners</p>
          <span className="text-sm md:text-base text-gray-600">
            Clients who have successfully secured their land through Pineleaf Estates.
          </span>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">100+</h2>
          <p className="font-semibold text-lg md:text-xl mb-2">Lands Sold Monthly</p>
          <span className="text-sm md:text-base text-gray-600">
            An average of 71 lands sold every month across various locations
          </span>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">5,678+</h2>
          <p className="font-semibold text-lg md:text-xl mb-2">People Actively Searching</p>
          <span className="text-sm md:text-base text-gray-600">
            Individuals currently looking to own land and trust Pineleaf Estates to guide them.
          </span>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: 'Property Development & Sales',
              desc: 'Invest in verified, high-value lands across South-South and South-East Nigeria, with expert guidance from purchase to development.',
              icon: 'search',
            },
            {
              title: 'Title Verification & Documentation',
              desc: 'We assist in verifying land titles, documentation, and ensuring all paperwork is authentic before any transaction.',
              icon: 'check',
            },
            {
              title: 'Land Banking Investments',
              desc: 'Multiply your wealth over time by investing in fast-appreciating lands through our carefully selected land banking schemes.',
              icon: 'dollar',
            },
          ].map((service, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <div className="rounded-lg overflow-hidden bg-gray-200 aspect-video">
                {/* Placeholder for service image */}
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  Service Image
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
              <a href="#" className="flex items-center gap-2 text-[#2F5318] font-semibold">
                Learn more
                <ChevronDown size={16} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Property Listing Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Property Listing</h2>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <EstateCard
            location="Umuwulu Awka South"
            title="Platinum Estate Awka"
            price={3000000}
            size="464SQM"
            dryLand="100% Dry Land"
            instantLocation="Instant Location"
            type="Buy & Build"
          />
          <EstateCard
            location="Igbariam Awka North"
            title="Emerald Garden Phase 1"
            price={1500000}
            size="500SQM"
            dryLand="100% Dry Land"
            instantLocation="Instant Location"
            type="Buy & Build"
          />
          <EstateCard
            location="Akwu-Ukwu Idemili South"
            title="Prime Lost City"
            price={1200000}
            size="600SQM"
            dryLand="100% Dry Land"
            instantLocation="Instant Location"
            type="Buy & Build"
          />
        </div>
      </section>

      {/* Guiding Principles Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Guiding Principles</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className="text-xl md:text-2xl font-semibold">Sound Land Solutions Tailored To You</h3>
            <p className="text-gray-600">
              We provide land solutions tailored to your needs, ensuring you make safe, profitable, and future-proof real estate investments.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden bg-gray-200 aspect-video">
            {/* Placeholder for guiding image */}
            <div className="h-full w-full flex items-center justify-center text-gray-400">
              Guiding Principles Image 1
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className="text-xl md:text-2xl font-semibold">Proper Execution You Can Trust</h3>
            <p className="text-gray-600">
              From the initial inquiry to documentation and allocation, we guarantee smooth, transparent transactions every step of the way.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden bg-gray-200 aspect-video">
            {/* Placeholder for guiding image */}
            <div className="h-full w-full flex items-center justify-center text-gray-400">
              Guiding Principles Image 2
            </div>
          </div>
        </div>
      </section>

      {/* PRRM Section */}
      <section className="bg-[#2F5318] py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            PRRM (The Pineleaf Realtor Reward Model)
          </h2>
          <p className="text-base md:text-lg text-[#ffffffcc] max-w-3xl mx-auto">
            At Pineleaf Estates, we believe success should be shared. That&apos;s why we created the PRRM:
            a simple, rewarding system designed to help you earn as you grow. Whether you&apos;re a student,
            full-time worker, or aspiring realtor, PRRM gives you a platform to build income, gain real estate experience,
            and earn commissions with ease.
          </p>

          {/* Image and Card */}
          <div className="mt-12 flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg bg-gray-200 aspect-video">
                {/* Placeholder for PRRM image */}
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  PRRM Event Image
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="w-full lg:w-1/2 text-left">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-black">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">How It Works</h3>
                <p className="text-sm md:text-base mb-6">
                  Become a PRRM Member by registering with a one-time fee of ₦50,000.
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-700 mr-2">✓</span>
                    <span className="text-gray-700">Earn 10% commission on every land sale you close.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 mr-2">✓</span>
                    <span className="text-gray-700">Grow your network and watch your earnings multiply, it&apos;s that simple.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 mr-2">✓</span>
                    <span className="text-gray-700">Refer other realtors and earn 4% from their successful sales.</span>
                  </li>
                </ul>

                <h3 className="text-xl md:text-2xl font-semibold mb-4">Why Join the PRRM Scheme?</h3>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-700 mr-2">✓</span>
                    <span className="text-gray-700">No prior experience needed — anyone can join and start learning.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 mr-2">✓</span>
                    <span className="text-gray-700">Community support — mentorship, updates, and guidance from the Pineleaf team.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 mr-2">✓</span>
                    <span className="text-gray-700">Transparent structure — commissions are clear, fair, and consistent.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 mr-2">✓</span>
                    <span className="text-gray-700">Real earning potential — some members have made hundreds of thousands in commission alone.</span>
                  </li>
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#2F5318] text-white px-6 py-3 rounded-lg text-sm hover:bg-[#1e3610] transition">
                    Get more Info
                  </button>
                  <button className="bg-white border border-[#2F5318] text-[#2F5318] px-6 py-3 rounded-lg text-sm hover:bg-gray-100 transition">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients & Realtors Are Saying</h2>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full w-12 h-12 bg-gray-300 shrink-0" />
                <div>
                  <h3 className="font-semibold">Client {idx + 1}</h3>
                  <p className="text-xs text-gray-500">Verified Buyer</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">&quot;Pineleaf made my land ownership journey stress-free and enjoyable! Highly recommend.&quot;</p>
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="#FBBF24" stroke="none" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <ChevronRight size={16} className="rotate-180" />
            </button>
            {Array.from({ length: 3 }).map((_, i) => (
              <button 
                key={i} 
                className={`w-8 h-8 rounded-full ${i === 0 ? 'bg-[#2F5318] text-white' : 'bg-gray-200'} flex items-center justify-center`}
              >
                {i + 1}
              </button>
            ))}
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Invest Smart Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24 bg-[#E6FFF6]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Invest Smart. Watch Your Wealth Grow</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-sm overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-4 px-6 text-left">Investment</th>
                <th className="py-4 px-6 text-left">ROI (6 months)</th>
                <th className="py-4 px-6 text-left">ROI (12 months)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-4 px-6">₦500,000</td>
                <td className="py-4 px-6">₦75,000</td>
                <td className="py-4 px-6">₦180,000</td>
              </tr>
              <tr className="border-t">
                <td className="py-4 px-6">₦1,000,000</td>
                <td className="py-4 px-6">₦150,000</td>
                <td className="py-4 px-6">₦360,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-8">
          <a href="#" className="bg-[#2F5318] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#1e3610] transition">
            Download Investment Brochure
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">FAQs</h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {[
            "Is Pineleaf Estates registered and trusted?",
            "How do I join the PRRM?",
            "What documents are included during purchase?",
            "Can I pay for lands in installments?",
            "Where are your estates located?"
          ].map((faq, idx) => (
            <details key={idx} className="border rounded-lg p-4 cursor-pointer group">
              <summary className="font-semibold flex justify-between items-center list-none">
                {faq}
                <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-gray-600 pt-4 pl-4">
                Answer to &quot;{faq}&quot; goes here.
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;