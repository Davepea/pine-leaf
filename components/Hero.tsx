import React from 'react'
import SearchLocation from '@/components/SearchLocation'
import Image from 'next/image'
import Link from 'next/link'
import EstateCard from '@/components/EstateCard'
import { ChevronDown } from 'lucide-react'
import InvestmentTable from './InvestmentTable'

const Hero = () => {
  return (
    <>
    <section className='pt-[9vw]  bg-[#E6FFF6] px-[6.1458vw] grid items-end relative md:h-full h-[90vh] '>
        <div className='py-[5.625vw] relative z-10 flex flex-col gap-[3.6458vw]' >
          <div className='max-w-[647px] '>
              <div className='flex flex-col md:gap-[30px]'>
  

              <h1 className='large-header md:leading-[66px] '>Building Legacies, one Property at a Time</h1>
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
 
    <section className="flex flex-col items-center py-[6.2vw] md:py-20 px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          What sets us apart
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12  max-w-7xl w-full">
          <div className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-lg bg-gray-200 aspect-video">
            {/* Placeholder for image */}
            <div className=" ">
            <div className="">
            <Image src="/img/Frame203.png" alt="What sets us apart" className="w-full h-auto object-cover" height={400} width={600}/>
            </div>
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
                  img: '/img/service-1.png',
                },
                {
                  title: 'Title Verification & Documentation',
                  desc: 'We assist in verifying land titles, documentation, and ensuring all paperwork is authentic before any transaction.',
                  img: '/img/service-2.png',
                },
                {
                  title: 'Land Banking Investments',
                  desc: 'Multiply your wealth over time by investing in fast-appreciating lands through our carefully selected land banking schemes.',
                  img: '/img/service-3.png',
                },
              ].map((service, idx) => (
                <div key={idx} className="flex flex-col gap-7 text-center border border-[#2F531833] p-[27px] rounded-[10px]">
                  <div className='grid place-content-center'>
                    <div className='w-[96px] h-[96px]'>
                    <Image src={service.img} alt={service.title} width={96} height={96} className="rounded-lg w-full h-auto" />
                    </div>
                  </div>
                  <div>
                    <h2 className="small-header pb-[20px]">{service.title}</h2>
                    <p className="detail-text">{service.desc}</p>
                  </div>
                  <div className='flex justify-center'>
                  <Link href="#">
                    <button className="flex items-center gap-[8px] text-[#2F5318] font-semibold">
                      Learn more
                      <ChevronDown size={16} />
                    </button>
                  </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
    
          {/* PROPERTY LISTING Section */}
          <section className="px-[6.1458vw] py-[6.2vw]">
            <h1 className="semi-header text-center">Property Listing</h1>
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
            <h1 className="semi-header text-center">Guiding Principles</h1>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-6">
               <div>
               <h2 className="small-header">Sound Land Solutions Tailored To You</h2>
                <small className='small-texts text-[#2F5318B2]'>
                We match your dreams with the right property.
                </small>
               </div>
                <p className="detail-text">We understand that every client’s needs are unique. That’s why our team goes the extra mile to evaluate each property thoroughly before listing, ensuring it fits your lifestyle, budget, and goals. Whether you’re a first-time buyer or an experienced investor, we provide guidance and flexible options that help you make the smartest land decisions.</p>
              </div>
              <div>
                <Image src="/img/guiding1.png" alt="Guiding Principles" width={500} height={300} className="rounded-xl w-full" />
              </div>
              <div>
                <Image src="/img/guiding1.png" alt="Guiding Principles" width={500} height={300} className="rounded-xl w-full" />
              </div>
              <div className="flex flex-col gap-6">
               <div>
               <h2 className="small-header">Prime Locations You Can Trust</h2>
                <small className='small-texts text-[#2F5318B2]'>
                We offer tabled, dry lands in areas with real growth potential.
                </small>
               </div>
                <p className="detail-text">Our properties are carefully selected in fast-developing areas with solid infrastructure and high investment potential. Whether you’re looking to build a home, start a business, or invest in land banking, we ensure the location is accessible, flood-free, and suitable for your purpose. With Pineleaf, location is never a compromise.</p>
              </div>
              
    
              <div className="flex flex-col gap-6">
              <div>
               <h2 className="small-header">Secure & Transparent Purchase</h2>
                <small className='small-texts text-[#2F5318B2]'>
                We prioritize your peace of mind with every transaction.
                </small>
               </div>
                <p className="detail-text">At Pineleaf Estates, we take pride in offering a secure and transparent buying experience. All our properties come with verified documentation, free from legal issues or hidden charges. We also ensure instant allocation upon purchase, so you can begin planning your project without delays. With us, you&apos;re not just buying land you&apos;re gaining peace of mind.</p>
              </div>
              <div>
                <Image src="/img/guiding2.png" alt="Guiding Principles" width={500} height={300} className="rounded-xl w-full" />
              </div>
            </div>
          </section>
    
          {/* PRRM Section */}
          <section className="bg-[#2F5318] py-16 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto text-center text-white">
            <h1 className="large-header !text-white mb-6">
              PRRM (The Pineleaf Realtor Reward Model)
            </h1>
            <p className="detail-text !text-[#ffffffcc] max-w-5xl mx-auto">
              At Pineleaf Estates, we believe success should be shared. That’s why we created the PRRM: 
              a simple, rewarding system designed to help you earn as you grow. Whether you&apos;re a student, 
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
            <div className=" p-8 rounded-lg  !text-white ">
              <h2 className="small-header mb-4 !text-white">How It Works</h2>
              <p className="small-texts mb-6 !text-white">
                Become a PRRM Member by registering with a one-time fee of ₦50,000.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text !text-white">Earn 10% commission on every land sale you close.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text !text-white">Grow your network and watch your earnings multiply, it’s that simple.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text !text-white">Refer other realtors and earn 4% from their successful sales.</span>
                </li>
              </ul>

              <hr className='border-gray-500 my-4'/>

              {/* Why Join */}
              <h2 className="small-header mb-4 !text-white">Why Join the PRRM Scheme?</h2>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text !text-white">No prior experience needed — anyone can join and start learning.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text !text-white">Community support — mentorship, updates, and guidance from the Pineleaf team.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text !text-white">Transparent structure — commissions are clear, fair, and consistent.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2">✓</span>
                  <span className="detail-text !text-white">Real earning potential — some members have made hundreds of thousands in commission alone.</span>
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
            <div className="grid md:grid-cols-2 gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-2xl">
                  <div className="flex flex-col  items-center gap-4 mb-4">
                    <div className="rounded-full w-[113px] h-[113px] bg-gray-300" />
                    <div>
                      <h3 className="font-semibold">Client {idx + 1}</h3>
                      <p className="text-xs text-gray-500">Verified Buyer</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">&quot;Pineleaf made my land ownership journey stress-free and enjoyable! Highly recommend.&quot;</p>
                  <div className="flex mt-4 justify-center text-yellow-400">
                    {'⭐'.repeat(5)}
                  </div>
                </div>
              ))}
            </div>
          </section>
    
          {/* INVEST SMART Section */}
          <section className="px-[6.1458vw] py-[6.2vw] bg-[#E6FFF6] flex flex-col gap-10">
           <div>
           <h1 className="semi-header text-center">Invest Smart. Watch Your Wealth Grow</h1>
            <p className="text-[#2f5318] detail-text text-center">
              Whether you&apos;re investing N200,000 0r N50 million, our structured plans offer guaranteed ROI over 6 or 12 months. It&apos;s real estate with real returns - safe, simple, and secure.
            </p>
           </div>
            <div className='overflow-x-scroll'>
            <InvestmentTable/>
            </div>
          </section>
    
          {/* FAQ Section */}
          <section className="px-[6.1458vw] py-[6.2vw]">
            <h1 className="semi-header text-center mb-10">What Our Clients & Realtors Are Saying</h1>
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
  )
}

export default Hero