import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <>
        <section className="py-16 px-4 sm:px-8 lg:px-16">
      
        <div className="text-center mb-12">
            <h1 className="large-header">Our Services</h1>
        </div>

       
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
            <Image height={500} width={500} src="/assets/services/property-development.jpg" alt="Property Development" className="w-full lg:w-1/2 rounded-xl shadow" />
            <div className="lg:w-1/2">
            <h3 className="small-header mb-2">Property Development & Sales</h3>
            <p className="detail-text mb-4">Whether you&apos;re building a dream home, commercial estate, or developing land for sale, we provide:</p>
            <ul className="list-disc ml-5 small-texts space-y-1 mb-4">
                <li>Custom property development based on your needs.</li>
                <li>Expert project management from start to finish.</li>
                <li>Secure documentation to ensure legal safety.</li>
            </ul>
            <p className="small-header mb-2">Why Choose Us?</p>
            <ul className="list-disc ml-5 small-texts space-y-1">
                <li>20+ years of real estate excellence</li>
                <li>High-quality construction standards</li>
                <li>Transparent & professional service</li>
            </ul>
            <button className="mt-4 bg-green-900 hover:bg-green-800 text-white text-sm font-medium px-5 py-2 rounded">Book for Consultation</button>
            </div>
        </div>

      
        <div className="flex flex-col-reverse lg:flex-row gap-8 mb-16">
            <div className="lg:w-1/2">
            <h3 className="small-header mb-2">Real Estate Investment & Land Banking</h3>
            <p className="detail-text mb-4">Investing in real estate is one of the smartest ways to build wealth. We offer:</p>
            <ul className="list-disc ml-5 small-texts space-y-1 mb-4">
                <li>Land banking opportunities with high appreciation value.</li>
                <li>Secure investments with flexible payment options.</li>
                <li>Strategic advisory to help you maximize returns.</li>
            </ul>
            <p className="small-header mb-2">Why Choose Us?</p>
            <ul className="list-disc ml-5 small-texts space-y-1">
                <li>We select prime locations in South-South & South-East Nigeria.</li>
                <li>Secure & legally verified investment options.</li>
                <li>Guidance from expert real estate consultants.</li>
            </ul>
            <button className="mt-4 bg-green-900 hover:bg-green-800 text-white text-sm font-medium px-5 py-2 rounded">Download Investment Plan</button>
            </div>
            <Image height={500} width={500} src="/assets/services/land-banking.jpg" alt="Land Banking" className="w-full lg:w-1/2 rounded-xl shadow" />
        </div>

     
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
            <Image height={500} width={500} src="/assets/services/title-verification.jpg" alt="Land Surveying" className="w-full lg:w-1/2 rounded-xl shadow" />
            <div className="lg:w-1/2">
            <h3 className="small-header mb-2">Land Surveying & Title Verification</h3>
            <p className="detail-text mb-4">Ensure your land ownership is legally secured with our expert documentation services:</p>
            <ul className="list-disc ml-5 small-texts space-y-1 mb-4">
                <li>Title Verification – Confirm land authenticity & ownership.</li>
                <li>Survey Plan Assistance – Proper land boundary mapping.</li>
                <li>Certificate of Occupancy (C of O) & Governor’s Consent Processing.</li>
            </ul>
            <p className="small-header mb-2">Why Choose Us?</p>
            <ul className="list-disc ml-5 small-texts space-y-1">
                <li>We prevent fraudulent land purchases.</li>
                <li>We help secure all necessary legal documents.</li>
                <li>Your investment remains protected for the future.</li>
            </ul>
            <button className="mt-4 bg-green-900 hover:bg-green-800 text-white text-sm font-medium px-5 py-2 rounded">Verify Your Land Title</button>
            </div>
        </div>

 
        <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="lg:w-1/2">
            <h3 className="small-header mb-2">Real Estate Consultancy & Training</h3>
            <p className="detail-text mb-4">We empower individuals & professionals with real estate education and expert advice. Services include:</p>
            <ul className="list-disc ml-5 small-texts space-y-1 mb-4">
                <li>One-on-one real estate consultations.</li>
                <li>Realtor training through Pineleaf Realtors Reward Mechanism (PRRM).</li>
                <li>Workshops & investment strategy planning.</li>
            </ul>
            <p className="small-header mb-2">Why Choose Us?</p>
            <ul className="list-disc ml-5 small-texts space-y-1">
                <li>Access to market insights & investment forecasts.</li>
                <li>Comprehensive training to become a successful realtor.</li>
                <li>Earn up to 10% commission through our PRRM program.</li>
            </ul>
            <button className="mt-4 bg-green-900 hover:bg-green-800 text-white text-sm font-medium px-5 py-2 rounded">Book for Consultation</button>
            </div>
            <Image height={500} width={500} src="/assets/services/consultancy-training.jpg" alt="Training" className="w-full lg:w-1/2 rounded-xl shadow" />
        </div>
        </section>

    </>
  )
}

export default page