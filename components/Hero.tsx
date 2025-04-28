import React from 'react'
import SearchLocation from '@/components/SearchLocation'
import Image from 'next/image'
import Link from 'next/link'
import EstateCard from '@/components/EstateCard'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  return (
    <>
    <section className='pt-[14.9479vw] bg-[#E6FFF6] px-[6.1458vw] grid items-end relative'>
        <div className='py-[5.625vw] relative z-10 flex flex-col gap-[3.6458vw]' >
          <div className='max-w-[647px] '>
              <div className='flex flex-col md:gap-[30px]'>
  

              <h1 className='md:text-[56px] leading-[66px] '>Building Legacies, one Property at a Time</h1>
              <p className=' text-[#000000CC] font-roboto text-[18px] max-w-[457px]'>
              Your trusted partner in real estate investments, helping you secure profitable lands in South-South and South-East Nigeria.
              </p>
              </div>
          </div>
          <div>
            <SearchLocation/>
            <p className=' font-roboto text-[14px] font-[400] md:pt-[12px] text-gray-500'>Input your preferred location or city and <Link href="#" className='text-[#2F5318] font-roboto font-semibold'> Explore </Link> our <Link href="#" className='text-[#2F5318] font-roboto font-semibold'>Properties</Link> </p>
          </div>
        </div>

        <div className='absolute right-0 top-0 !bottom-0 overflow-hidden '>
          <Image
          src='/img/hero.png'
          width={900}
          height={800}
          alt='hero-image'
          className='w-full h-full'
          />
        </div>


    </section>
    <section className="flex flex-col items-center py-20 px-4 md:px-8 lg:px-20">
      <h2 className="semi-header pb-[4.17vw]">
        What sets us apart
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 items-center max-w-7xl w-full">
  
        <div className="relative w-full lg:w-1/2">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src="/img/Frame203.png" alt="What sets us apart" className="w-full h-auto object-cover" height={500} width={500}/>
          </div>
        </div>

        <div className="flex flex-col gap-10 w-full lg:w-1/2">
     
          <div className="flex gap-6 items-start">
            <div className="h-10 w-10 bg-gray-100 text-black rounded-full flex items-center justify-center font-bold text-lg">
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

 
          <div className="flex gap-6 items-start">
            <div className="h-10 w-10 bg-gray-100 text-black rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <div>
              <h3 className="font-semibold text-lg lg:text-xl mb-2">Secured and Verified Land Deals</h3>
              <p className="text-gray-600 text-sm lg:text-base">
                All our properties are legally verified, properly documented, and free from disputes — giving you peace of mind with every purchase.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="h-10 w-10 bg-gray-100 text-black rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <div>
              <h3 className="font-semibold text-lg lg:text-xl mb-2">Innovative Realtors Reward System (PRRM)</h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Our PRRM program rewards realtors with up to 10% commission and exclusive benefits. It’s a simple, powerful way to earn through referrals and real estate sales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className='grid md:grid-cols-3 sm:grid-cols-1 px-[6.25vw] py-[4.1vw] text-center bg-[#E6FFF6] gap-[24px]'>
      <div>
        <h1 className='large-header'>1,819
        +</h1>
        <p className=' small-header'>
        Happy Landowners
        </p>
        <span className='small-texts'>
        Clients who have successfully secured their land through Pineleaf Estates.
        </span>
      </div>
      <div>
        <h1 className='large-header'>100
        +</h1>
        <p className=' small-header'>
        Lands Sold Monthly
        </p>
        <span className='small-texts'>
        An average of 71 lands sold every month across various locations
        </span>
      </div>
      <div>
        <h1 className='large-header'>5,678
        +
        </h1>
        <p className='small-header'>
        People Actively Searching
        </p>
        <span className='small-texts'>
        Individuals currently looking to own land and trust Pineleaf Estates to guide them.
        </span>
      </div>
    </section>

      {/* OUR SERVICES Section */}
      <section className="px-[6.1458vw] py-[6.2vw]">
            <h1 className="large-header text-center">Our Services</h1>
            <div className="grid md:grid-cols-3 gap-[23px] mt-10">
              {[
                {
                  title: 'Property Development & Sales',
                  desc: 'Invest in verified, high-value lands across South-South and South-East Nigeria, with expert guidance from purchase to development.',
                  img: '/img/service1.png',
                },
                {
                  title: 'Title Verification & Documentation',
                  desc: 'We assist in verifying land titles, documentation, and ensuring all paperwork is authentic before any transaction.',
                  img: '/img/service2.png',
                },
                {
                  title: 'Land Banking Investments',
                  desc: 'Multiply your wealth over time by investing in fast-appreciating lands through our carefully selected land banking schemes.',
                  img: '/img/service3.png',
                },
              ].map((service, idx) => (
                <div key={idx} className="flex flex-col gap-7">
                  <div>
                    <Image src={service.img} alt={service.title} width={400} height={300} className="rounded-lg w-full h-auto" />
                  </div>
                  <div>
                    <h2 className="small-header pb-[20px]">{service.title}</h2>
                    <p className="detail-text">{service.desc}</p>
                  </div>
                  <Link href="#">
                    <button className="flex items-center gap-[8px] text-[#2F5318] font-semibold">
                      Learn more
                      <ChevronDown size={16} />
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </section>
    
          {/* PROPERTY LISTING Section */}
          <section className="px-[6.1458vw] py-[6.2vw]">
            <h1 className="semi-header">Property Listing</h1>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {/* Example Cards */}
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
    
          {/* GUIDING PRINCIPLES Section */}
          <section className="px-[6.1458vw] py-[6.2vw] flex flex-col gap-10">
            <h1 className="semi-header">Guiding Principles</h1>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-6">
                <h2 className="small-header">Sound Land Solutions Tailored To You</h2>
                <p className="detail-text">We provide land solutions tailored to your needs, ensuring you make safe, profitable, and future-proof real estate investments.</p>
              </div>
              <div>
                <Image src="/img/guiding1.png" alt="Guiding Principles" width={500} height={300} className="rounded-xl w-full" />
              </div>
    
              <div className="flex flex-col gap-6">
                <h2 className="small-header">Proper Execution You Can Trust</h2>
                <p className="detail-text">From the initial inquiry to documentation and allocation, we guarantee smooth, transparent transactions every step of the way.</p>
              </div>
              <div>
                <Image src="/img/guiding2.png" alt="Guiding Principles" width={500} height={300} className="rounded-xl w-full" />
              </div>
            </div>
          </section>
    
          {/* PRRM Section */}
          <section className="bg-[#2F5318] py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto text-center text-white">
        <h1 className="large-header text-white mb-6">
          PRRM (The Pineleaf Realtor Reward Model)
        </h1>
        <p className="detail-text text-[#ffffffcc] max-w-3xl mx-auto">
          At Pineleaf Estates, we believe success should be shared. That’s why we created the PRRM: 
          a simple, rewarding system designed to help you earn as you grow. Whether you're a student, 
          full-time worker, or aspiring realtor, PRRM gives you a platform to build income, gain real estate experience, 
          and earn commissions with ease.
        </p>

        {/* Image and Card */}
        <div className="mt-12 flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/Frame 211.png"
                alt="Pineleaf PRRM Event"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Card */}
          <div className="w-full lg:w-1/2 text-left">
            {/* How it Works */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="small-header mb-4">How It Works</h2>
              <p className="small-texts mb-6">
                Become a PRRM Member by registering with a one-time fee of ₦50,000.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text">Earn 10% commission on every land sale you close.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text">Grow your network and watch your earnings multiply, it’s that simple.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text">Refer other realtors and earn 4% from their successful sales.</span>
                </li>
              </ul>

              {/* Why Join */}
              <h2 className="small-header mb-4">Why Join the PRRM Scheme?</h2>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text">No prior experience needed — anyone can join and start learning.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text">Community support — mentorship, updates, and guidance from the Pineleaf team.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text">Transparent structure — commissions are clear, fair, and consistent.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text">Real earning potential — some members have made hundreds of thousands in commission alone.</span>
                </li>
              </ul>

              {/* Buttons */}
              <div className="flex gap-4">
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
    
          {/* CLIENT TESTIMONIALS Section */}
          <section className="px-[6.1458vw] py-[6.2vw]">
            <h1 className="semi-header text-center mb-10">What Our Clients & Realtors Are Saying</h1>
            <div className="grid md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full w-12 h-12 bg-gray-300" />
                    <div>
                      <h3 className="font-semibold">Client {idx + 1}</h3>
                      <p className="text-xs text-gray-500">Verified Buyer</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">&quot;Pineleaf made my land ownership journey stress-free and enjoyable! Highly recommend.&quot;</p>
                  <div className="flex mt-4 text-yellow-400">
                    {'⭐'.repeat(5)}
                  </div>
                </div>
              ))}
            </div>
          </section>
    
          {/* INVEST SMART Section */}
          <section className="px-[6.1458vw] py-[6.2vw] bg-[#E6FFF6] flex flex-col gap-10">
            <h1 className="semi-header text-center">Invest Smart. Watch Your Wealth Grow</h1>
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
            <div className="flex justify-center">
              <Link href="#">
                <button className="bg-[#2F5318] text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800">Download Investment Brochure</button>
              </Link>
            </div>
          </section>
    
          {/* FAQ Section */}
          <section className="px-[6.1458vw] py-[6.2vw]">
            <h1 className="semi-header text-center mb-10">FAQs</h1>
            <div className="space-y-6">
              {[
                "Is Pineleaf Estates registered and trusted?",
                "How do I join the PRRM?",
                "What documents are included during purchase?",
                "Can I pay for lands in installments?",
                "Where are your estates located?"
              ].map((faq, idx) => (
                <details key={idx} className="border-b pb-4 cursor-pointer">
                  <summary className="font-semibold flex justify-between items-center">
                    {faq}
                    <ChevronDown className="h-5 w-5" />
                  </summary>
                  <p className="text-gray-600 text-sm pt-2">Answer to &quot;{faq}&quot; goes here.</p>
                </details>
              ))}
            </div>
          </section>
    

    </>
  )
}

export default Hero