'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import SearchLocation from '@/components/SearchLocation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import InvestmentTable from './InvestmentTable'
import TestimonialCarousel from './TestimonialCarousel'
import PropertyListing from '@/components/PropertyListing'
import FAQSection from './FAQs'
import { IoMdCheckmark } from 'react-icons/io'
import { MdArrowOutward } from 'react-icons/md'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
 // Properly type your refs
  const heroTextRef = useRef<HTMLHeadingElement>(null)
  const heroSubtextRef = useRef<HTMLParagraphElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const propertyListingRef = useRef<HTMLDivElement>(null)
  const guidesPrinciplesRef = useRef<HTMLElement>(null)
  const prrmRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Hero Section Animations
    const heroTimeline = gsap.timeline()
    
    if (heroTextRef.current) {
      heroTimeline.fromTo(heroTextRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
    }
    
    if (heroSubtextRef.current) {
      heroTimeline.fromTo(heroSubtextRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.5'
      )
    }

    // Scroll-triggered animations for sections
    const sections = [
      { ref: servicesRef, start: 'top 80%', end: 'bottom 20%' },
      { ref: statsRef, start: 'top 80%', end: 'bottom 20%' },
      { ref: propertyListingRef, start: 'top 80%', end: 'bottom 20%' },
      { ref: guidesPrinciplesRef, start: 'top 80%', end: 'bottom 20%' },
      { ref: prrmRef, start: 'top 80%', end: 'bottom 20%' },
      { ref: testimonialsRef, start: 'top 80%', end: 'bottom 20%' },
      { ref: faqRef, start: 'top 80%', end: 'bottom 20%' }
    ]

    sections.forEach(({ ref, start, end }) => {
      const element = ref.current
      if (element && element.children) {
        // Get all child elements and convert to array
        const childElements: HTMLElement[] = []
        for (let i = 0; i < element.children.length; i++) {
          const child = element.children[i]
          if (child instanceof HTMLElement) {
            childElements.push(child)
          }
        }
        
        if (childElements.length > 0) {
          gsap.fromTo(
            childElements,
            { 
              opacity: 0, 
              y: 50,
              scale: 0.9
            },
            {
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 1,
              stagger: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: start,
                end: end,
                toggleActions: 'play none none reverse'
              }
            }
          )
        }
      }
    })

    return () => {
      // Cleanup animations if component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  return (
    <>
    <section className='md:pt-[8.2vw] pt-[170px]  bg-[#E6FFF6] px-[6.1458vw] grid items-end relative md:h-full pb-[90px]'>
       <div className='absolute md:hidden block top-0 bottom-0 right-0 left-0 bg-[#00000074] z-10'></div>
        <div className='py-[5.625vw] relative z-20 flex flex-col gap-[70px] ' >
          <div className='max-w-[647px] '>
              <div className='flex flex-col gap-[30px]'>
                <h1 
                  ref={heroTextRef}
                  className='md:text-[#000000CC] text-white head-1'
                >
                  Building Legacies, <span className='md:text-[#2F5318] text-[#F5DD00]'>one Property</span> at a Time
                </h1>
                <p 
                  ref={heroSubtextRef}
                  className=' md:text-[#000000CC] text-white font-roboto para-2 max-w-[457px]'
                >
                  Your trusted partner in real estate investments, helping you secure profitable lands in South-South and South-East Nigeria.
                </p>
              </div>
          </div>
          <div>
            <SearchLocation/>
            <p className=' pt-[15px] font-roboto text-[14px] md:font-[400] md:pt-[12px] md:text-gray-500 text-white font-[700]'>
              Input your preferred location or city and <Link href="#" className='md:text-[#2F5318] font-roboto font-semibold'> Explore </Link> our <Link href="#" className='md:text-[#2F5318] font-roboto font-semibold'>Properties</Link>
            </p>
          </div>
        </div>

        <div className='absolute right-0 top-0 !bottom-0 overflow-hidden '>
          <Image
            src='/img/hero.png'
            width={1000}
            height={1000}
            alt='hero-image'
            className='w-full h-full'
          />
        </div>
    </section>
 
    <section ref={servicesRef} className="flex flex-col items-center section"
    >
        <div className="header">
          <h2 className="head-2 font-bold text-cent">
          What sets us apart
        </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start  max-w-7xl w-full">
          <div className='md:w-[700px]'>
            <Image src="/img/hero2.png" width={600} height={400} alt='what-sets-us-apart' className=' w-full'/>
          </div>

          <div className="flex flex-col gap-8 md:gap-10 w-full lg:w-1/2">
            <div className="flex gap-4 md:gap-6 items-start max-w-[486px]">
              <div className="h-10 w-10 bg-gray-100 text-black rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                1
              </div>
              <div>
                <h3 className="bold-para-1 mb-[8px]">20+ Years of Real Estate Excellence</h3>
                <p className="text-gray-600 para-3 md:!leading-[29.2px] leading-[19.6px]">
                  With 20+ years of real estate experience, Pineleaf Estates is known for delivering trust, value, and results.
                  We&apos;re committed to consistency, professionalism, and client satisfaction.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 items-start max-w-[486px]">
              <div className="h-10 w-10 bg-gray-100 text-black rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                2
              </div>
              <div>
                <h3 className="bold-para-1 mb-[8px]">Secured and Verified Land Deals</h3>
                <p className="text-gray-600 para-3 md:!leading-[29.2px] leading-[19.6px]">
                  All our properties are legally verified, properly documented, and free from disputes — giving you peace of mind with every purchase.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 items-start max-w-[486px]">
              <div className="h-10 w-10 bg-gray-100 text-black rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                3
              </div>
              <div>
                <h3 className="bold-para-1 mb-[8px]">Innovative Realtors Reward System (PRRM)</h3>
                <p className="text-gray-600 para-3 md:!leading-[29.2px] leading-[19.6px]">
                  Our PRRM program rewards realtors with up to 10% commission and exclusive benefits. It&apos;s a simple, powerful way to earn through referrals and real estate sales.
                </p>
              </div>
            </div>
          </div>
        </div>
    </section>

    <section 
      ref={statsRef}
      className='section-with-bg  grid md:grid-cols-3 sm:grid-cols-1 px-[6.25vw] py-[4.1vw] text-center bg-[#E6FFF6] gap-[24px]'
    >
      <div className='md:border-r p-1'>
        <h1 className='head-1 text-[#2F5318] mb-[20px]'>1,819
        +</h1>
        <p className=' bold-para-1 mb-[10px]'>
        Happy Landowners
        </p>
        <span className='para-4'>
        Clients who have successfully secured their land through Pineleaf Estates.
        </span>
      </div>
      <div className=' md:border-r p-1'>
        <h1 className='head-1 text-[#2F5318] mb-[20px]'>100
        +</h1>
        <p className=' bold-para-1 mb-[10px]'>
        Lands Sold Monthly
        </p>
        <span className='para-4'>
        An average of 71 lands sold every month across various locations
        </span>
      </div>
      <div className=' p-1'>
        <h1 className='head-1 text-[#2F5318] mb-[20px]'>5,678
        +
        </h1>
        <p className='bold-para-1 mb-[10px]'>
        People Actively Searching
        </p>
        <span className='para-4'>
        Individuals currently looking to own land and trust Pineleaf Estates to guide them.
        </span>
      </div>
    </section>

    <section className="section">
          <div className="header">
            <h1 className="head-2 text-center">Our Services</h1>

          </div>
            <div 
              ref={propertyListingRef}
              className="flex gap-[24px] md:flex-row flex-col md:justify-center "
            >
              {[
                {
                  title: 'Property Development & Sales',
                  desc: 'Invest in verified, high-value lands across South-South and South-East Nigeria, with expert guidance from purchase to development.',
                  img: '/img/service-1.png',
                },
                {
                  title: 'Title Verification & Documentation Assistance',
                  desc: 'We help you secure your land with title verification, survey plan assistance, and support in processing key legal documents.',
                  img: '/img/service-2.png',
                },
                
                {
                  title: 'Land Banking & Investment Consultation',
                  desc: 'Acquire land in fast-developing areas, benefit from property appreciation, and receive expert consultation for long-term ROI.',
                  img: '/img/service-3.png',
                },
                
              ].map((service, idx) => (
                <div key={idx} className="flex flex-col gap-[30px] text-center border md:max-w-[384px] border-[#2F531833] p-[27px] rounded-[10px]">
                  <div className='grid place-content-center'>
                    <div className='md:w-[96px] md:h-[96px] w-[50px] h-[50px]'>
                    <Image src={service.img} alt={service.title} width={96} height={96} className="rounded-lg w-full h-auto" />
                    </div>
                  </div>
                  <div className='flex flex-col gap-[20px]'>
                    <h2 className="bold-para-1">{service.title}</h2>
                    <p className="para-2-3">{service.desc}</p>
                  </div>
                  <div className='flex justify-center'>
                  <Link href="/service">
                    <button className="flex items-center gap-[8px] text-[#2F5318] font-semibold">
                      <p className='bold-para-1'>
                      Learn more

                      </p>
                      <MdArrowOutward size={16}/>
                    </button>
                  </Link>
                  </div>
                </div>
              ))}
            </div>
    </section>
      
    <section className="section">
            <div className="header">
              <h1 className=" head-2 text-center">Property Listing</h1>
            </div>
            <PropertyListing/>
            
    </section>
    
    <section 
      ref={guidesPrinciplesRef}
      className="section flex flex-col gap-10"
    >
      <div className="header">
       <h1 className="head-2 text-center">Guiding Principles</h1>

      </div>
      <div className='flex flex-col gap-[60px]' >
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6 md:order-1 order-2">
            <div>
              <h2 className="bold-para-1">Sound Land Solutions Tailored To You</h2>
              <small className='para-4 text-[#2F5318B2]'>
              We match your dreams with the right property.
              </small>
            </div>
            <p className="para-3 max-w-[612px] md:!leading-[29.2px]">We understand that every client&apos;s needs are unique. That&apos;s why our team goes the extra mile to evaluate each property thoroughly before listing, ensuring it fits your lifestyle, budget, and goals. Whether you&apos;re a first-time buyer or an experienced investor, we provide guidance and flexible options that help you make the smartest land decisions.</p>
          </div>
          <div className='md:order-2 order-1 md:flex md:justify-end'>
            <Image src="/img/gp-1.png" alt="Guiding Principles" width={500} height={300} className="rounded-xl w-full max-w-[475px]" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Image src="/img/gp-2.png" alt="Guiding Principles" width={500} height={300} className="rounded-xl w-full max-w-[475px]" />
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="bold-para-1">Prime Locations You Can Trust</h2>
              <small className='para-4 text-[#2F5318B2]'>
              We offer tabled, dry lands in areas with real growth potential.
              </small>
            </div>
            <p className="para-3 max-w-[612px] md:!leading-[29.2px]">Our properties are carefully selected in fast-developing areas with solid infrastructure and high investment potential. Whether you&apos;re looking to build a home, start a business, or invest in land banking, we ensure the location is accessible, flood-free, and suitable for your purpose. With Pineleaf, location is never a compromise.</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6 md:order-1 order-2">
            <div>
              <h2 className="bold-para-1">Secure & Transparent Purchase</h2>
              <small className='para-4 !text-[#2F5318B2]'>
              We prioritize your peace of mind with every transaction.
              </small>
            </div>
            <p className="para-3 max-w-[612px] md:!leading-[29.2px]">At Pineleaf Estates, we take pride in offering a secure and transparent buying experience. All our properties come with verified documentation, free from legal issues or hidden charges. We also ensure instant allocation upon purchase, so you can begin planning your project without delays. With us, you&apos;re not just buying land you&apos;re gaining peace of mind.</p>
          </div>
          <div className='md:order-2 order-1 md:flex md:justify-end'>
            <Image src="/img/gp-3.png" alt="Guiding Principles" width={500} height={300} className="rounded-xl w-full max-w-[475px]" />
          </div>
        </div>
      </div>
    </section>

    <section 
      ref={prrmRef}
      className="bg-[#2F5318] section-with-bg py-[60px] "
    >
      <div className="max-w-7xl mx-auto text-center text-white">
        <div className="header flex flex-col gap-[20px]">
          <h1 className="head-1 !text-white">
          PRRM (The Pineleaf Realtor Reward Model)
        </h1>
        <p className="max-w-[1199px] para-2 m-auto">
          At Pineleaf Estates, we believe success should be shared. That’s why we created the PRRM a simple, rewarding system designed to help you earn as you grow. Whether you&apos;re a student, full-time worker, or aspiring realtor, PRRM gives you a platform to build income, gain real estate experience, and earn commissions with ease.
        </p>
        </div>

        <div className=" flex flex-col lg:flex-row gap-14  ">
          <div className="w-full lg:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/img/pprm.png"
                alt="Pineleaf PRRM Event"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 text-left">
            <div className="rounded-lg !text-white ">
              <h2 className="head-5 mb-[7px] !text-white">How It Works</h2>
              <p className="para-3 mb-[19px] !text-white">
                Become a PRRM Member by registering with a one-time fee of ₦50,000.
              </p>

              <b className='text-[#E6FFF6] bold-para-2 leading-[25.2px]'>
                Once registered:
              </b>
              <ul className="space-y-4 mb-8 mt-[20px] grid md:grid-cols-2 grid-cols-1 gap-x-[30px] gap-y-[11px]">
                <li className="flex gap-[15px] items-center">
                  <IoMdCheckmark className="mt-1 text-white flex-shrink-0 text-3xl" />
                  <span className="para-3 !text-white ">Earn 10% commission on every land sale you close.</span>
                </li>
                <li className="flex gap-[15px] items-center">
                  <IoMdCheckmark className="mt-1 text-3xl text-white  flex-shrink-0" />
                  <span className="para-3 !text-white">Grow your network and watch your earnings multiply, it&apos;s that simple.</span>
                </li>
                <li className="flex gap-[12px] items-center">
                  <IoMdCheckmark className="mt-1 text-3xl text-whit flex-shrink-0" />
                  <span className="para-3 !text-white">Refer other realtors and earn 4% from their successful sales.</span>
                </li>
              </ul>

              <hr className='border-gray-500 my-6'/>

              <h2 className="bold-para-2 mb-4 !text-white">Why Join the PRRM Scheme?</h2>

              <ul className="space-y-4 mb-8 flex flex-col md:grid md:grid-cols-2 gap-[30px]">
                <li className="flex gap-[12px] items-start">
                  <IoMdCheckmark className="mt-1 text-3xl text-white  flex-shrink-0" />
                  <span className="para-3 !text-white ">
                    <b className='!text-[#E6FFF6] !font-bold para-3'>No prior experience needed —</b> <br className='md:block hidden'/>
                     anyone can join and start learning.
                    </span>
                </li>
                <li className="flex gap-[12px] items-start">
                  <IoMdCheckmark className="mt-1 text-3xl text-white  flex-shrink-0" />
                  <span className="para-3 !text-white para-3">
                    <b className='text-[#E6FFF6]'>Community support —</b> <br className='md:block hidden'/>
                     mentorship, updates, and guidance from the Pineleaf team.
                    </span>
                </li>
                <li className="flex gap-[12px] items-start">
                  <IoMdCheckmark className="mt-1 text-3xl text-white flex-shrink-0" />
                  <span className="para-3 !text-white">
                    <b className='text-[#E6FFF6]'>Transparent structure —</b> <br className='md:block hidden'/>
                     commissions are clear, fair, and consistent.
                    </span>
                </li>
                <li className="flex gap-[12px] items-start">
                  <IoMdCheckmark className="mt-1 text-3xl text-white  flex-shrink-0" />
                  <span className="para-3 !text-white">
                    <b className='text-[#E6FFF6]'> 
                    Real earning potential — 
                    </b> <br className='md:block hidden'/>
                    some members have made hundreds of thousands in commission alone.</span>
                </li>
              </ul>

              <div className="flex gap-8">
                <Link href='/pprm'>
                  <button className="bg-[#2F5318] border text-white px-6 py-3 rounded-lg md:text-[20px] text-[16px] hover:bg-[#1e3610] transition font-[700] ">
                  Get more Info
                </button>
                </Link>
                <Link href='/register'>
                <button className="bg-white border border-[#2F5318] text-[#2F5318] px-6 py-3 rounded-lg md:text-[20px] text-[16px] hover:bg-gray-100 transition font-[700]">
                  Register Now
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section 
      ref={testimonialsRef}
      className="section"
    >
    <div className="header">
      <h1 className="head-2 text-center">What Our Clients & Realtors Are Saying</h1>

    </div>
      <div className="">
        <TestimonialCarousel/>
      </div>
    </section>

    <section className="section-with-bg bg-[#E6FFF6] flex flex-col">
      <div className='header flex flex-col gap-[20px]'>
        <h1 className="head-2 text-center">Invest Smart. Watch Your Wealth Grow</h1>
        <p className="text-[#2f5318] para-2 max-w-[1199px] m-auto text-center">
          Whether you&apos;re investing N200,000 0r N50 million, our structured plans offer guaranteed ROI over 6 or 12 months. It&apos;s real estate with real returns - safe, simple, and secure.
        </p>
      </div>
      <div >
        <InvestmentTable/>
      </div>
    </section>

    <section className='section pb-[100px]'>
      <FAQSection/>
    </section>

    </>
  )
}

export default Hero