'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#2F5318] px-[] text-white px-[6.2vw]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 sm:text-center gap-8 md:text-start text-center">
        {/* Left Section */}
        <div className=' md:col-span-2 '>
          <div className='flex md:justify-start justify-center'>
          <Image src="/img/logo.png" alt="Logo" width={185} height={185} />

          </div>
          <p className="mt-2 text-sm pb-[40px]">...Land Banking is a Must</p>
          <div className='max-w-[244px] pb-[20px]'>
            <p className=" text-sm">
            <span className="font-bold text-[#A5D6A7]">Head Office:</span> Suit F17 Garbs Mega Plaza <br/>
            39 Awka Road Onitsha, Anambra State
          </p>
          </div>
          <p className="mt-2 text-sm text-[#A5D6A7]">info@pineleafestates.com</p>
        </div>

        <div className=' md:col-span-3 pt-16'>
          <div className='max-w-[450px]'>
            <h3 className="text-lg font-bold mb-5">Our Newsletter</h3>
          <p className="font-roboto font-light text-sm mb-8">Your Gateway to a World of Real Estate: Explore, Engage, and Empower with our Exclusive Newsletter Subscription!</p>
          <div className="flex bg-[#4b6b4c] backdrop-blur-2xl bg-gradient-to-r rounded-xl overflow-hidden">
            <input
              type="email"
              placeholder="Email Address"
              className="p-2 flex-1 !h-[42px]  rounded-l-md text-black "
            />
            <button className="bg-[#E6FFF6] text-green-900 font-bold px-4 rounded-r-md">
              Subscribe
            </button>
          </div>

          <h3 className="text-lg font-bold mt-8 mb-2">Follow Us</h3>
          <div className="flex gap-4 md:justify-start justify-center">
            <Link href="#" className="text-white">
              <Image src="/img/facebook.svg.png" alt="Facebook" width={24} height={24} />
            </Link>
            <Link href="#" className="text-white">
              <Image src="/img/instagram.png" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="#" className="text-white">
              <Image src="/img/whatsapp.png" alt="WhatsApp" width={24} height={24} />
            </Link>
          </div>
          </div>
        </div>

        {/* Right Section */}
        <div className=' md:col-span-1 pt-16'>
          <h3 className="text-lg font-bold mb-5">Quick Links</h3>
          <ul className="flex flex-col gap-[12px] text-sm font-roboto font-light ">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/service">Services</Link></li>
            <li><Link href="/property">Properties</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#FFFFFF33] mt-10 py-10 flex justify-between text-xs">
        <p>Pineleafestate©2025 All rights Reserved</p>
        <p>Built by sunmence</p>
        <Link href="/privacy-policy" className="font-bold">Privacy Policy</Link>
      </div>
    </footer>
  );
}
